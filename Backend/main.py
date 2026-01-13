# backend/main.py
from fastapi import FastAPI
from database import Base, engine
from routers import auth, attendance, workout, users , memberships, trainers,payments,notifications ,admin
from fastapi.middleware.cors import CORSMiddleware
import models
from fastapi.staticfiles import StaticFiles
# create tables (ok for dev; use migrations later)
#Base.metadata.create_all(bind=engine) by monu

models.Base.metadata.create_all(bind=engine)
app = FastAPI()
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent
app.mount("/images", StaticFiles(directory="images"), name="images")
# Allow local dev frontend — tighten this for production
app.add_middleware(
    CORSMiddleware,
  #  allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    allow_origins=["*"],
)

app.include_router(auth.router)
app.include_router(attendance.router)
app.include_router(workout.router)
app.include_router(users.router)
app.include_router(memberships.router)
app.include_router(trainers.router)
app.include_router(payments.router)
app.include_router(notifications.router)
app.include_router(admin.router)
