from fastapi import WebSocket
import logging
import json
from .helper.interviewHelper import generate_questions, append_question_answer
from .helper.getDetails import get_details_for_next_question
import io
import azure.cognitiveservices.speech as azure_speech

logger = logging.getLogger(__name__)

# AZURE_SPEECH_KEY = "dc3ee357cd1f47f19560794237b05430"
# AZURE_REGION = "westus"

async def handle_interview(websocket: WebSocket, db, user_id):
    try:
        # Accept connection on websocket in case client tries to initiate a connection
        if websocket.client_state.name == "CONNECTING":
            await websocket.accept()

        if websocket.client_state.name == "CONNECTED":
            details = get_details_for_next_question(user_id)
            job_role = details.get('job_role')
            resume_text = details.get('resume_data')
            experience_year = details.get('experience_level')
            time_left = details.get('interviewDuration')

        while True:
            question = generate_questions(job_role, resume_text, experience_year, user_id, time_left)

            # Configure speech synthesis
            # speech_config = azure_speech.SpeechConfig("dc3ee357cd1f47f19560794237b05430", "westus")

            # # Create a BytesIO stream to hold audio data
            # audio_stream = io.BytesIO()
            # push_stream = azure_speech.audio.PushAudioOutputStream(audio_stream)
            # audio_config = azure_speech.audio.AudioOutputConfig(stream=push_stream)

            # synthesizer = azure_speech.SpeechSynthesizer(speech_config=speech_config, audio_config=audio_config)

            # # Start speech synthesis
            # result = synthesizer.speak_text_async(question).get()

            # if result.reason == azure_speech.ResultReason.SynthesizingAudioCompleted:
            #     print("Speech synthesis successful")
            #     audio_stream.seek(0)  # Move to the beginning of the stream
            #     audio_data = audio_stream.read()  # Read the audio data

            #     # Send audio data through WebSocket
            #     await websocket.send_bytes(audio_data)
            #     print("Audio data sent through WebSocket")
            # elif result.reason == azure_speech.ResultReason.Canceled:
            #     cancellation_details = result.cancellation_details
            #     print(f"Speech synthesis canceled: {cancellation_details.reason}")
            await websocket.send_text(question)

            # Receive the answer from WebSocket
            answer = await websocket.receive_text()
            response_data = json.loads(answer)
            transcript = response_data["transcript"]

            total_seconds = response_data["timeLeft"]
            minutes = total_seconds // 60
            seconds = total_seconds % 60

            time_left = f"{int(minutes)}:{int(seconds):02d}"

            # Store the question and answer in the database
            print(question, ":", transcript )
            append_question_answer(question, transcript, user_id)

    except Exception as e:
        logger.exception(f"Some error occurred: {e}")
