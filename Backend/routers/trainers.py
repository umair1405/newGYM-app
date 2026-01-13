from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
import models

router = APIRouter(prefix="/trainers", tags=["Trainers"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Create trainer
@router.post("/")
def create_trainer(name: str, specialty: str, db: Session = Depends(get_db)):
    trainer = models.Trainer(name=name, specialty=specialty)
    db.add(trainer)
    db.commit()
    db.refresh(trainer)
    return trainer

# Get all trainers
@router.get("/")
def get_trainers(db: Session = Depends(get_db)):
    return db.query(models.Trainer).all()

# Assign trainer to user
@router.post("/assign")
def assign_trainer(user_id: int, trainer_id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    trainer = db.query(models.Trainer).filter(models.Trainer.id == trainer_id).first()

    if not user or not trainer:
        raise HTTPException(status_code=404, detail="User or Trainer not found")

    user.trainer_id = trainer.id
    db.commit()
    return {"message": "Trainer assigned successfully"}
