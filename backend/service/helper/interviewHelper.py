from openai import AzureOpenAI
import json
from pathlib import Path
from service.helper.getDetails import get_previous_QA
from utils.database import get_db_service
import json
import logging
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError
from ..config.env import env

azure_endpoint = env.AZURE_ENDPOINT
api_key = env.API_KEY
api_version = env.API_VERSION
model = env.MODEL

client = AzureOpenAI(
    azure_endpoint=azure_endpoint,
    api_key=api_key,
    api_version=api_version
)

def generate_questions(job_role, resume_text, experience_year, user_id, time_left):
    previousQA = get_previous_QA(user_id)
    
    prompt = f"""
        You are an interview assistant tasked with conducting a professional yet conversational interview for a {job_role} role. The candidate is applying for {experience_year} position. Your goal is to engage the candidate in a natural, human-like conversation, ensuring they feel comfortable and connected throughout the interview. And please start the interview with a conversation, Do not directly jump into technical questions.
        
        ### Your focus is to ask **one question at a time** ###
        ### The question should be short and to the point. Make sure it is no more than 150-200 characters, and keep it concise and precise. ###
        Here are your instructions:

        1. Ask Questions One at a Time:
        - You must ask only **one question at a time** and wait for the candidate's response before asking the next question. 
        - Do not display multiple questions at once. After the candidate answers, proceed with the next question.
        - Ensure the question is concise, and to the point. Not more than one or two lines.

        2. Introduction and Rapport Building:
        - Start with friendly, introductory questions to ease the candidate into the interview. Ask about their background, hobbies, or interests to establish rapport.

        3. Resume Details (if provided):
        - The candidate's resume is as follows: {resume_text}.
        - Use it to guide the conversation and ask questions about the candidate’s experience, skills, and projects. Focus on deeper follow-up questions based on their responses.

        4. Technical and Experience-Based Questions:
        - Transition smoothly into more technical or role-specific questions after the introduction. Build on the candidate’s previous answers for natural flow.

        5. Handling the Absence of a Resume:
        - If no resume is provided, begin with open-ended questions about their experience and skills. Ask relevant follow-up questions based on their responses.

        6. Previous Questions:
        - Always Start with a Introduction and make sure to ask general question at Start.
        - Previous questions and answers: {previousQA}.
        - Ask next question. Do not ask same questions again and again.
        - Keep follow-up questions relevant to the candidate’s previous responses.

        7. Time Management:
        - You have {time_left} minutes remaining for the interview.
        - Be mindful of the time, and if there is less than 1 minute left, wrap up the conversation with a polite thank-you and offer closing remarks.

        The tone of the interview should be conversational, friendly, and engaging while maintaining professionalism. 
        Your focus is to ask **one question at a time** and let the candidate respond before moving to the next.
    """
    
    messages = [{'role': 'system', 'content': prompt}]
    
    # print(prompt)
    response = client.chat.completions.create(
        model=model,  
        messages=messages,
        temperature=0.7,
        max_tokens=2000
    )
    
    questions_text = response.choices[-1].message.content.strip()

    return questions_text



def append_question_answer(question, answer, user_id):
    db = get_db_service()
    try:

        query_fetch = text('''
            SELECT "previousQA"
            FROM "Candidates"
            WHERE "candidateId" = :user_id
        ''')
        result = db.execute(query_fetch, {"user_id": user_id}).fetchone()

        if result is None or result[0] is None:
            previousQA_data = {}
        else:
            # Parse the existing JSON data
            previousQA_data = result[0]

        # Find the next question number dynamically
        next_question_number = f"Question_{len(previousQA_data) + 1}"
        # Append the new question and answer
        previousQA_data[next_question_number] = {
            "question": question,
            "answer": answer
        }
        
        # Convert the updated data back to JSON format
        updated_previousQA = json.dumps(previousQA_data)
        
        # Update the database with the new JSON data
        query_update = text('''
            UPDATE "Candidates"
            SET "previousQA" = :updated_previousQA
            WHERE "candidateId" = :user_id
        ''')

        result = db.execute(query_update, {
            "updated_previousQA": updated_previousQA,
            "user_id": user_id
        })
        
        db.commit()
        return result
    
    except SQLAlchemyError as e:
        logging.error(f"Database error occurred: {str(e)}")
        raise RuntimeError("An error occurred while storing the response.") from e
