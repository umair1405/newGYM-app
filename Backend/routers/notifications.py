from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
import models

router = APIRouter(prefix="/notifications", tags=["Notifications"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Create notification (Admin / System)
@router.post("/")
def create_notification(user_id: int, message: str, db: Session = Depends(get_db)):
    note = models.Notification(user_id=user_id, message=message)
    db.add(note)
    db.commit()
    db.refresh(note)
    return note

# Get notifications for a user
@router.get("/{user_id}")
def get_notifications(user_id: int, db: Session = Depends(get_db)):
    return db.query(models.Notification).filter(models.Notification.user_id == user_id).all()
