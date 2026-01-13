from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Float
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)

    trainer_id = Column(Integer, ForeignKey("trainers.id"), nullable=True)
    trainer = relationship("Trainer", back_populates="users")

    attendance = relationship(
        "Attendance",
        back_populates="user",
        cascade="all, delete-orphan",
        passive_deletes=True
    )

class Attendance(Base):
    __tablename__ = "attendance"

    id = Column(Integer, primary_key=True)
    user_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False
    )
    check_in = Column(DateTime, default=datetime.utcnow)
    check_out = Column(DateTime, nullable=True)

    user = relationship("User", back_populates="attendance")


class WorkoutCategory(Base):
    __tablename__ = "workout_category"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    
    memberships = relationship("Membership", back_populates="category")

class Exercise(Base):
    __tablename__ = "exercise"
    id = Column(Integer, primary_key=True)
    category_id = Column(Integer, ForeignKey("workout_category.id"))
    name = Column(String)
    image_url = Column(String)
    description = Column(String)

class Workout(Base):
    __tablename__ = "workout"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String)
    photo_url = Column(String)
    category_id = Column(Integer, ForeignKey("workout_category.id"))

class Membership(Base):
    __tablename__ = "membership"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    price = Column(Float)
    duration_months = Column(Integer)

    category_id = Column(Integer, ForeignKey("workout_category.id"))
    category = relationship("WorkoutCategory", back_populates="memberships")
    
class Trainer(Base):
    __tablename__ = "trainers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    specialty = Column(String, nullable=False)

    users = relationship("User", back_populates="trainer")


class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    membership_id = Column(Integer, ForeignKey("membership.id"), nullable=False)

    amount = Column(Float, nullable=False)
    start_date = Column(DateTime, default=datetime.utcnow)
    end_date = Column(DateTime, nullable=False)

    user = relationship("User")
    membership = relationship("Membership")

class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    message = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User")

class Admin(Base):
    __tablename__ = "admin"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
