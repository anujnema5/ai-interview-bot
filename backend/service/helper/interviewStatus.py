from utils.database import get_db_service
from sqlalchemy import text
import logging
from sqlalchemy.exc import SQLAlchemyError


# Get Status Id
def check_status(user_id):
    db = get_db_service()
    try:
        query = text('''
                    
                    SELECT "statusId"
                    FROM "Candidates"
                    WHERE "candidateId" = :user_id
                    ''')

        result = db.execute(query,{"user_id":user_id}).fetchone()
        db.commit()
        status = (result[0])
        return status
    
    except SQLAlchemyError as e:
        logging.error(f"Database error occurred: {str(e)}")
        db.rollback()
        raise RuntimeError("An error occurred while storing the response.") from e

# Update Status Id
def update_status(user_id):
    db = get_db_service()
    try:
        query = text('''
                    UPDATE "Candidates"
                SET "statusId" = :updated_statusid
                WHERE "candidateId" = :user_id
                    ''')
        
        result = db.execute(query, {
                "updated_statusid": "1",
                "user_id": user_id
            })
        
        db.commit()
        return {"status":True,
                "message":"Status Updated Successfully"}
    
    except SQLAlchemyError as e:
        logging.error(f"Database error occurred: {str(e)}")
        db.rollback()
        raise RuntimeError("An error occurred while storing the response.") from e