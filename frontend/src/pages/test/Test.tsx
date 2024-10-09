import React, { useState } from 'react';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';

const TextToSpeech = () => {
    const [text, setText] = useState('');
    const [audioUrl, setAudioUrl] = useState('');

    const synthesizeSpeech = async () => {
        debugger
        const speechConfig = sdk.SpeechConfig.fromSubscription("dc3ee357cd1f47f19560794237b05430", "westus");
        speechConfig.speechSynthesisVoiceName = "en-US-AvaMultilingualNeural";

        const synthesizer = new sdk.SpeechSynthesizer(speechConfig);

        try {
            const result = synthesizer.speakTextAsync(text)

            console.log(result)

            // if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
                console.log("Speech synthesized for text [" + text + "]");
                const { audioData } = result;

                const blob = new Blob([audioData], { type: 'audio/wav' });
                const url = URL.createObjectURL(blob);
                setAudioUrl(url);
            // } else {
            //     console.error("Speech synthesis canceled, " + result.errorDetails);
            // }
        } catch (error) {
            console.error("Error synthesizing speech:", error);
        } finally {
            synthesizer.close();
        }
    };

    return (
        <div>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to synthesize"
            />
            <button onClick={synthesizeSpeech}>Synthesize Speech</button>
            {audioUrl && (
                <audio controls src={audioUrl}>
                    Your browser does not support the audio element.
                </audio>
            )}
        </div>
    );
};

export default TextToSpeech;