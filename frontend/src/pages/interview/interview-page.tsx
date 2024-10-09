import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertBack, AudioBadge, CustomAvatar } from "@/components/custom-ui";
import { VideoCard } from "@/components/cards";
import QuestionCard from "@/components/cards/question-card";
import SoundWaveIcon from "@/assets/images/sound-wave.svg";
import botVideo from "@/assets/bot.mp4";
import { ROUTES, WEBSOCKET_URL } from "@/utils/constants";
import { useStore } from "@/store";
import { useNavigate } from 'react-router-dom';
import { convertMillisecondsToSeconds, convertMinutesToMilliseconds } from "@/utils";

const FAKE_QUESTION = "...";

type TextForSubtitle = {
    type: string,
    transcript: string
}

const InterviewUI = () => {

    const { user, setUserTimeLeft, setStep, steps } = useStore();
    const userId = user.userId;
    const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
    const [messages, setMessages] = useState([]);
    const [textForSubtitle, setTextForSubtitle] = useState<TextForSubtitle>({ type: '', transcript: '' });
    const [timeLeft, setTimeLeft] = useState(() => convertMinutesToMilliseconds(user?.interviewDuration ?? 0));
    const [currentSpokenChunk, setCurrentSpokenChunk] = useState('');
    const [backAlert, setBackAlert] = useState(false);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const navigate = useNavigate();
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const recognitionRef = useRef<SpeechRecognition | null>(null);
    const [subtitleChunks, setSubtitleChunks] = useState<string[]>([]);


    const nextStep = () => { setStep('interview'); navigate(ROUTES.THANK_YOU) };
    // const API_URL = 'https://interview-ai-dev-backend.azurewebsites.net/test-to-speech';
    const API_URL = 'http://127.0.0.1:8000/test-to-speech';

    async function fetchAudioDuration(blobUrl) {
        return new Promise((resolve) => {
            const audio = new Audio();
            audio.onloadedmetadata = () => {
                resolve(audio.duration * 1000); // Convert to milliseconds
            };
            audio.src = blobUrl;
        });
    }

    const fetchAudio = async (text) => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            });

            if (response.ok) {
                const blob = await response.blob();
                const audioUrl = URL.createObjectURL(blob);
                setAudioUrl(audioUrl);

                // Split text into chunks for streaming effect
                const words = text.split(' ');
                const chunks = [];
                let chunk = [];
                for (let i = 0; i < words.length; i++) {
                    chunk.push(words[i]);
                    if (chunk.length >= 5 || i === words.length - 1) {
                        chunks.push(chunk.join(' '));
                        chunk = [];
                    }
                }
                setSubtitleChunks(chunks);

                const audioDuration = await fetchAudioDuration(audioUrl);

                return { audioDuration, chunks };
            } else {
                console.error("Failed to convert text to speech");
            }
        } catch (error) {
            console.error("Error fetching audio:", error);
        }
    };

    useEffect(() => {
        const playAudioAndDisplayText = async () => {
            if (audioUrl && subtitleChunks.length) {
                const audio = new Audio(audioUrl);

                // Stop microphone while the audio is playing
                recognitionRef.current?.stop();

                // Play the audio
                audio.play().catch(error => console.error("Audio play error:", error));

                // Get the audio duration
                const audioDuration = await fetchAudioDuration(audioUrl);
                const chunkDisplayTime = audioDuration / subtitleChunks.length;

                let chunkIndex = 0;
                // Immediately set the first subtitle chunk when playback starts
                setTextForSubtitle({ type: 'interviewer', transcript: subtitleChunks[chunkIndex] });

                const displayInterval = setInterval(() => {
                    chunkIndex++;
                    if (chunkIndex < subtitleChunks.length) {
                        // Display the next chunk of subtitles
                        setTextForSubtitle(prev => ({
                            type: 'interviewer',
                            transcript: prev.transcript + ' ' + subtitleChunks[chunkIndex],
                        }));
                    } else {
                        // Clear the interval when all chunks are displayed
                        clearInterval(displayInterval);
                    }
                }, chunkDisplayTime);

                audio.onended = () => {
                    clearInterval(displayInterval);
                    // Reset subtitle display after audio ends
                    setTextForSubtitle({ type: 'interviewer', transcript: '' });
                    startListening(); // Restart listening for speech after audio ends
                };
            }
        };


        playAudioAndDisplayText();
    }, [audioUrl, subtitleChunks]);

    const startListening = () => {
        if (!("webkitSpeechRecognition" in window)) {
            alert("Speech recognition not supported in this browser.");
            return;
        }

        const recognition = new (window.webkitSpeechRecognition || (window as any).SpeechRecognition)();

        recognitionRef.current = recognition; // Save the recognition instance to Ref for later control
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        recognition.onresult = event => {
            let finalTranscript = "";
            setCurrentSpokenChunk('');
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                setCurrentSpokenChunk((prev) => {
                    const prevWords = new Set(prev.split(' '));
                    const newWords = transcript.split(' ').filter(word => !prevWords.has(word));
                    return [...prev.split(' '), ...newWords].join(' ');
                });

                if (event.results[i].isFinal) {
                    finalTranscript += transcript;
                    setMessages(prevMessages =>
                        [...prevMessages, { type: "user", text: finalTranscript }]);
                    setTextForSubtitle({ type: 'applicant', transcript: finalTranscript });

                    if (webSocket) {
                        webSocket.send(JSON.stringify({
                            transcript: finalTranscript,
                            timeLeft: convertMillisecondsToSeconds(timeLeft)
                        }));
                        setCurrentSpokenChunk('');
                        setTextForSubtitle({ type: 'applicant', transcript: '' }); // Clear spoken text after sending
                    }
                }
            }
        };

        recognition.onerror = event => {
            console.error("Speech recognition error:", event.error);
        };

        recognition.onend = () => {
            console.log("Speech recognition ended.");
        };

        recognition.start();
    };

    useEffect(() => {
        const socketInstance = new WebSocket(WEBSOCKET_URL + userId);

        socketInstance.onmessage = async (event) => {
            const text = event.data;
            await fetchAudio(text);
            setCurrentSpokenChunk(''); // Reset the current spoken chunk when a new question arrives
        };

        socketInstance.onclose = () => {
            console.log("WebSocket connection closed");
        };

        socketInstance.onerror = error => {
            console.error("WebSocket error:", error);
        };

        setWebSocket(socketInstance);

        return () => {
            socketInstance.close();
        };
    }, [userId]);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(prevTime => {
                    if (prevTime <= 1000) {
                        navigate(ROUTES.THANK_YOU);
                        clearInterval(timer);
                        return 0;
                    }
                    const newTimeLeft = prevTime - 1000;
                    setUserTimeLeft(newTimeLeft);
                    return newTimeLeft;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [timeLeft, setUserTimeLeft]);

    useEffect(() => {
        window.history.pushState(null, "", window.location.href);

        const preventGoBack = () => {
            setBackAlert(true);
            window.history.pushState(null, "", window.location.href);
        };

        const startVideo = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) videoRef.current.srcObject = stream;
            } catch (error) {
                console.error("Error accessing the camera:", error);
            }
        };

        const handleBeforeUnload = (event) => {
            const message = "Tip: Don't reload the page for smooth interview experience";
            event.returnValue = message; // Standard
            return message; // For some browsers
        };

        window.addEventListener("popstate", preventGoBack);
        window.addEventListener('beforeunload', handleBeforeUnload);
        startVideo();

        return () => {
            if (videoRef.current?.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach(track => track.stop());
            }

            window.removeEventListener("popstate", preventGoBack);
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    return (
        <>
            <AlertBack open={backAlert} close={setBackAlert} />
            <div className="flex flex-col items-center w-full h-full bg-gray-50 border">
                <div className="flex flex-col w-[90%] h-[100%] px-8 py-12 justify-between rounded-2xl gap-12">
                    <div className="grid grid-cols-2 gap-10 h-[50%]">
                        <VideoCard
                            videoSrc={botVideo}
                            badgeContent={
                                textForSubtitle.type === 'interviewer' ? <AudioBadge /> :
                                    <CustomAvatar fallbackText={"A"} />
                            }
                            badgeLabel="Alex"
                        />

                        <VideoCard
                            videoRef={videoRef}
                            badgeContent={
                                textForSubtitle.type === 'applicant' ? <AudioBadge /> :
                                    <CustomAvatar fallbackText={user?.firstName?.charAt(0) || "A"} />
                            }
                            badgeLabel="You"
                        />
                    </div>

                    <QuestionCard
                        question={textForSubtitle.transcript || currentSpokenChunk || FAKE_QUESTION}
                    />

                    <div className="flex justify-end items-center">
                        {/* <Button
                            type="button"
                            variant="outline"
                            className="w-40 h-12 text-gray-600 hover:bg-gray-100 transition-all duration-300"
                        >
                            Next Question
                        </Button> */}

                        <div className="flex items-center gap-6">
                            {/* <Button
                                variant="outline"
                                className="w-40 h-12 transition-all duration-300"
                            >
                                Cancel
                            </Button> */}

                            <Button
                                onClick={nextStep}
                                type="submit"
                                className="w-40 h-12 text-white shadow-md transition-all duration-300"
                            >
                                Finish Interview
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default InterviewUI;