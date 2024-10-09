from fastapi import UploadFile
from pypdf import PdfReader
from io import BytesIO
from utils.database import get_db_service
from sqlalchemy import text


def insert_data_in_db(candidate_id, resume_text):
    db = get_db_service()

    db_query = text('''
    UPDATE "Candidates"
    SET "resumeData" = :resume_text
    WHERE "candidateId" = :candidate_id
''')

    db.execute(db_query, {'candidate_id': candidate_id, 'resume_text': resume_text})
    db.commit()

    return

async def upload_resume(pdf_file: UploadFile, user_id):
    try:
        # Read file content into memory
        file_content = await pdf_file.read()
        
        # Convert the file content into a BytesIO stream
        pdf_stream = BytesIO(file_content)
        
        # Use PdfReader to process the PDF file
        reader = PdfReader(pdf_stream)
        
        # Extract text from all pages (example)
        resume_text = ""
        for page in reader.pages:
            resume_text += page.extract_text()
        
        data = insert_data_in_db(user_id, resume_text)
        
        return {"text": resume_text}
    except Exception as e:
        return {"error": str(e)}