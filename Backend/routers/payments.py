from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
import models
from datetime import datetime, timedelta

router = APIRouter(prefix="/payments", tags=["Payments"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Subscribe to a plan
@router.post("/subscribe")
def subscribe(user_id: int, membership_id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    plan = db.query(models.Membership).filter(models.Membership.id == membership_id).first()

    if not user or not plan:
        raise HTTPException(status_code=404, detail="User or Plan not found")

    start_date = datetime.utcnow()
    end_date = start_date + timedelta(days=30 * plan.duration_months)

    payment = models.Payment(
        user_id=user.id,
        membership_id=plan.id,
        amount=plan.price,
        start_date=start_date,
        end_date=end_date
    )

    db.add(payment)
    db.commit()
    db.refresh(payment)
    return {"message": "Subscription successful", "expires_on": end_date}

# Payment history
@router.get("/history/{user_id}")
def payment_history(user_id: int, db: Session = Depends(get_db)):
    return db.query(models.Payment).filter(models.Payment.user_id == user_id).all()
