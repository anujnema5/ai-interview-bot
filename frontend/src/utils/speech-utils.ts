import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import { convertMillisecondsToSeconds } from "./timer";

export const startListening = (webSocket, setMessages, setTextForSubtitle, timeLeft) => {
    if (!("webkitSpeechRecognition" in window)) {
        alert("Speech recognition not supported in this browser.");
        return;
    }

    const recognition = new (window.webkitSpeechRecognition || window.SpeechRecognition)();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = event => {
        let finalTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;

            if (event.results[i].isFinal) {
                finalTranscript += transcript;

                // Update the messages state
                setMessages(prevMessages =>
                    [...prevMessages, { type: "user", text: finalTranscript }]
                );

                // Update the subtitle display
                setTextForSubtitle({ type: 'applicant', transcript: finalTranscript });

                // Send the transcription along with other data (like timeLeft) to the WebSocket
                if (webSocket && webSocket.readyState === WebSocket.OPEN) {
                    webSocket.send(JSON.stringify({
                        transcript: finalTranscript,
                        timeLeft: convertMillisecondsToSeconds(timeLeft) // Assuming this function exists
                    }));
                } else {
                    console.warn("WebSocket is not open, unable to send data.");
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
export const handleSpeech = (transcript, setTextForSubtitle) => {
    if (!("speechSynthesis" in window && transcript)) {
        console.error("Speech synthesis not supported or no text to speak.");
        return;
    }

    const utterances = transcript
        .match(new RegExp(`.{1,160}(\\s|$)`, "g"))
        ?.map(chunk => {
            const utterance = new SpeechSynthesisUtterance(chunk);
            utterance.rate = 1;
            utterance.pitch = 1;
            return utterance;
        });

    if (utterances?.length) {
        const speakNextChunk = (index = 0) => {
            if (index < utterances.length) {
                const currentUtterance = utterances[index];
                currentUtterance.onend = () => speakNextChunk(index + 1);
                speechSynthesis.speak(currentUtterance);
            } else {
                startListening();
            }
        };
        speakNextChunk();
    }
};




export const initWebSocketConnection = (url, userId, setTextForSubtitle, setMessages) => {
    const socketInstance = new WebSocket(`${url}${userId}`);

    socketInstance.onmessage = event => {
        console.log("Message from server: ", event.data);
        setTextForSubtitle({ type: 'interviewer', transcript: event.data });
    };

    socketInstance.onclose = () => {
        console.log("WebSocket connection closed");
    };

    socketInstance.onerror = error => {
        console.error("WebSocket error:", error);
    };

    return socketInstance;
};

// import * as readline from 'readline';

export const speakText = (text: string) => {
    const audioFile = "speech_transcription.wav";
    const speechConfig = sdk.SpeechConfig.fromSubscription("dc3ee357cd1f47f19560794237b05430", "westus");
    const audioConfig = sdk.AudioConfig.fromAudioFileOutput(audioFile);

    speechConfig.speechSynthesisVoiceName = "en-US-AvaMultilingualNeural";
    const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

    synthesizer.speakTextAsync(text, (result: any) => {
        if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
            console.log("synthesis finished.");
        } else {
            console.error("Speech synthesis canceled, " + result.errorDetails +
                "\nDid you set the speech resource key and region values?");
        }
        synthesizer.close();
    },
        (err: any) => {
            console.trace("err - " + err);
            synthesizer.close();
        });
}