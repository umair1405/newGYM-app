from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
import models

router = APIRouter(prefix="/memberships", tags=["Memberships"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Create membership plan (Admin)
@router.post("/")
def create_membership(name: str, price: float, duration_months: int, db: Session = Depends(get_db)):
    plan = models.Membership(name=name, price=price, duration_months=duration_months)
    db.add(plan)
    db.commit()
    db.refresh(plan)
    return plan

# Get all plans
@router.get("/")
def get_memberships(db: Session = Depends(get_db)):
    return db.query(models.Membership).all()

# Update plan
@router.put("/{plan_id}")
def update_membership(plan_id: int, name: str, price: float, duration_months: int, db: Session = Depends(get_db)):
    plan = db.query(models.Membership).filter(models.Membership.id == plan_id).first()
    if not plan:
        raise HTTPException(status_code=404, detail="Plan not found")

    plan.name = name
    plan.price = price
    plan.duration_months = duration_months
    db.commit()
    return plan

# Delete plan
@router.delete("/{plan_id}")
def delete_membership(plan_id: int, db: Session = Depends(get_db)):
    plan = db.query(models.Membership).filter(models.Membership.id == plan_id).first()
    if not plan:
        raise HTTPException(status_code=404, detail="Plan not found")

    db.delete(plan)
    db.commit()
    return {"message": "Plan deleted"}
