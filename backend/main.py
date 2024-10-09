from fastapi import FastAPI, WebSocket, Depends, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from service.interview import handle_interview
from service.helper.resumeHelper import upload_resume
from typing import Optional
from utils.database import get_db
from sqlalchemy.orm import Session
from service.helper.getDetails import get_user_data
from service.helper.azureTTS import azure_text_to_speech
from service.helper.interviewStatus import update_status , check_status
from fastapi.responses import FileResponse

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserData(BaseModel):
    userId: int

class TextRequest(BaseModel):
    text: str
    
@app.get("/")
def base_route():
    return {"msg": "Welcome to AI-Interview Bot"}

@app.post("/resume-upload")
async def document_upload(file: UploadFile = File(...), user_id: int = Form(...)):
    resume_data = await upload_resume(file, user_id)
    return {"filename": file.filename, "data": resume_data}

@app.post("/get_user_id")
async def receive_user_data(user: UserData):
    user_id = user.userId
    user_data = get_user_data(user_id)
    return(user_data)

@app.websocket("/ws1")
async def websocket_endpoint(websocket: WebSocket, db: Session = Depends(get_db)):
    query_params = websocket.query_params
    user_id = query_params.get('user_id', None)
    
    await handle_interview(websocket, db, user_id)

@app.post("/test-to-speech")
async def text_to_speech(request: TextRequest):
    # Extract the text from the request body
    text = request.text

    # Call your azure_text_to_speech function (or any text-to-speech library)
    audio_file = azure_text_to_speech(text)
    
    print("AUDIO FILE", audio_file)
    if audio_file:
        print("SUCCESS")
        return FileResponse(audio_file, media_type='audio/wav', filename="output.wav")
    else:
        raise HTTPException(status_code=500, detail="Error in text to speech conversion")
    
@app.post("/update-status")
async def update_interview_status(user_id: int):
    interview_status = update_status(user_id) 
    return interview_status
    
@app.post("/check-status")
async def check_interview_status(user_id: int):
    interview_status = check_status(user_id) 
    return interview_status