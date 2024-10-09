from utils.database import get_db_service
from sqlalchemy.sql import text

from sqlalchemy import text

from sqlalchemy import text

def get_user_data(user_id):
    db = get_db_service()  # Get the database service

    try:
        # Define the SQL query to retrieve user data
        query = text('''
            SELECT 
    c."firstName",
    c."lastName",
    c."emailId",
    c."interviewDuration",
    jr."jobRoleName" AS "job_role", 
    el."experienceLevelName" AS "experience_level",
    COALESCE(ARRAY_AGG(s."skillName"), '{}') AS "skills"
FROM 
    "Candidates" c
JOIN 
    "JobRole" jr ON c."jobRoleId" = jr."jobRoleId"
JOIN 
    "ExperienceLevel" el ON c."experienceLevelId" = el."experienceLevelId"
LEFT JOIN 
    "UserSkillsMapping" usm ON c."candidateId" = usm."candidateId"
LEFT JOIN 
    "Skills" s ON usm."skillId" = s."skillId"
WHERE 
    c."candidateId" = :user_id
GROUP BY 
    c."firstName", c."lastName", c."emailId", jr."jobRoleName", el."experienceLevelName", c."interviewDuration"

        ''')

        # Execute the query with the given user_id
        result = db.execute(query, {"user_id": user_id}).fetchone()

        # If no data is found, return a dictionary with None values
        if result is None:
            print(f"No user found with user_id: {user_id}")
            return {
                "firstName": None,
                "lastName": None,
                "email": None,
                "job_role": None,
                "experience_level": None,
                "skills": [],
                "interviewDuration": None
            }

        # Extract data from the result tuple
        firstName, lastName, email, interviewDuration, job_role, experience_level, skills = result

        # Prepare the result in a dictionary with proper keys
        formatted_result = {
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "interviewDuration": interviewDuration,
            "job_role": job_role,
            "experience_level": experience_level,
            "skills": skills if skills else [],  # Ensure skills is an empty array if None
        }

        return formatted_result

    except Exception as e:
        # Log or handle any exceptions that occur
        print(f"Error occurred: {e}")
        return None


def get_details_for_next_question(user_id):
    db = get_db_service()
    
    try:
        query = text('''
            SELECT 
                c."resumeData",
                c."interviewDuration",
                jr."jobRoleName" AS "job_role",
                el."experienceLevelName" AS "experience_level"
            FROM 
                "Candidates" c
            JOIN 
                "JobRole" jr ON c."jobRoleId" = jr."jobRoleId"
            JOIN 
                "ExperienceLevel" el ON c."experienceLevelId" = el."experienceLevelId"
            WHERE 
                c."candidateId" = :user_id
        ''')

        result = db.execute(query, {"user_id": user_id}).fetchone()
        
        # If no data is found, return a dictionary with None values
        if result is None:
            print(f"No user found with user_id: {user_id}")
            return {
                "resume_data": None,
                "job_role": None,
                "experience_level": None,
                "interviewDuration": None
            }

        # Extract data from the result tuple (in the correct order)
        resume_data, interviewDuration, job_role, experience_level = result

        # Prepare the result in a dictionary with proper keys
        formatted_result = {
            "resume_data": resume_data,
            "job_role": job_role,
            "experience_level": experience_level,
            "interviewDuration": interviewDuration
        }

        # Print and return the formatted result
        return formatted_result

    except Exception as e:
        print(f"An error occurred: {e}")
        return None


def get_previous_QA(user_id):
    db = get_db_service()
    
    query = text('''
    SELECT "previousQA"
    FROM "Candidates"
    WHERE "candidateId" = :user_id
''')
    
    # Execute the query with parameter binding
    result = db.execute(query, {"user_id": user_id}).fetchone()
    
    # Check if result is None and handle it accordingly
    if result is None:
        return None  # or handle it in a way that suits your application

    previousQA = result[0]
    return previousQA  # Assuming the column name is 'previousQA'
