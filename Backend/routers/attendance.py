from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime
from database import SessionLocal
import models
from sqlalchemy import Date

router = APIRouter(prefix="/attendance", tags=["Attendance"])

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# -------------------------
# POST: Check-In
# -------------------------
@router.post("/checkin")
def check_in(user_id: int, db: Session = Depends(get_db)):

    # Check if user exists
    user_exists = db.query(models.User).filter(models.User.id == user_id).first()
    if not user_exists:
        raise HTTPException(status_code=404, detail="User not found")
 
    # Create attendance record
    attendance = models.Attendance(
        user_id=user_id,
        check_in=datetime.utcnow()
    )
    db.add(attendance)
    db.commit()
    db.refresh(attendance)

    return {
        "status": "success",
        "message": "Checked in successfully",
        "attendance_id": attendance.id,
        "check_in_time": attendance.check_in,
    }


# -------------------------
# POST: Check-Out
# -------------------------
@router.post("/checkout")
def check_out(attendance_id: int, db: Session = Depends(get_db)):

    # Find the attendance record
    record = db.query(models.Attendance).filter(models.Attendance.id == attendance_id).first()

    if not record:
        raise HTTPException(status_code=404, detail="Attendance record not found")

    if record.check_out:
        raise HTTPException(status_code=400, detail="Already checked out")

    # Update checkout time
    record.check_out = datetime.utcnow()
    db.commit()
    db.refresh(record)

    return {
        "status": "success",
        "message": "Checked out successfully",
        "check_out_time": record.check_out
    }


# -------------------------
# GET: Today’s attendance
# -------------------------
@router.get("/today/{user_id}")
def today_attendance(user_id: int, db: Session = Depends(get_db)):
    today = datetime.utcnow().date()

    record = (
        db.query(models.Attendance)
        .filter(models.Attendance.user_id == user_id)
        .filter(models.Attendance.check_in.cast(Date) == today)
        .first()
    )

    if not record:
        return {"message": "No attendance today"}

    return {
        "attendance_id": record.id,
        "check_in": record.check_in,
        "check_out": record.check_out
    }
