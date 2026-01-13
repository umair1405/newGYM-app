from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import engine, SessionLocal
from models import Admin
from passlib.hash import bcrypt

router = APIRouter(prefix="/admin", tags=["Admin"])

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/setup") #username =umair     password=Umair1405@

def setup_admin(username: str, password: str, db: Session = Depends(get_db)):
    existing = db.query(Admin).first()
    if existing:
        raise HTTPException(status_code=400, detail="Admin already exists")

    admin = Admin(
        username=username,
        password=bcrypt.hash(password)
    )
    db.add(admin)
    db.commit()
    return {"message": "Admin created successfully"}


@router.post("/login")
def admin_login(username: str, password: str, db: Session = Depends(get_db)):
    admin = db.query(Admin).filter(Admin.username == username).first()
    if not admin or not bcrypt.verify(password, admin.password):
        raise HTTPException(status_code=401, detail="Invalid admin credentials")

    return {"message": "Admin login successful"}
