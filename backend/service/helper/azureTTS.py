import azure.cognitiveservices.speech as speechsdk
import os

# Modify your Azure function
def azure_text_to_speech(text):
    # Set up Azure Speech configuration
    subscription_key = "dc3ee357cd1f47f19560794237b05430"  # Replace with your subscription key
    service_region = "westus"      # Replace with your service region
    speech_config = speechsdk.SpeechConfig(subscription=subscription_key, region=service_region)

    # Set up audio output configuration to save to a file
    audio_filename = "output.wav"  # Change to your desired filename
    audio_config = speechsdk.audio.AudioOutputConfig(filename=audio_filename)
    
    # Initialize the speech synthesizer
    synthesizer = speechsdk.SpeechSynthesizer(speech_config=speech_config, audio_config=audio_config)
    
    # Perform speech synthesis
    result = synthesizer.speak_text_async(text).get()
    
    # Check the result of the synthesis
    if result.reason == speechsdk.ResultReason.SynthesizingAudioCompleted:
        print(f"Speech synthesis successful, audio saved to: {audio_filename}")
        return audio_filename  # Return the filename for further processing
    elif result.reason == speechsdk.ResultReason.Canceled:
        cancellation_details = result.cancellation_details
        print(f"Speech synthesis canceled: {cancellation_details.reason}")
        return None