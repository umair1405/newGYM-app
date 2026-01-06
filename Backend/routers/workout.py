from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
import models

router = APIRouter(prefix="/workout", tags=["Workout"])


# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# -------------------------
# GET: Workout categories
# -------------------------
@router.get("/categories")
def get_categories(db: Session = Depends(get_db)):
    categories = db.query(models.WorkoutCategory).all()

    return [
        {"id": c.id, "name": c.name}
        for c in categories
    ]


# -------------------------
# GET: Exercises by category
# -------------------------
@router.get("/exercises/{category_id}")
def get_exercises(category_id: int, db: Session = Depends(get_db)):

    category = db.query(models.WorkoutCategory).filter(
        models.WorkoutCategory.id == category_id
    ).first()

    if not category:
        raise HTTPException(status_code=404, detail="Workout category not found")

    exercises = db.query(models.Exercise).filter(
        models.Exercise.category_id == category_id
    ).all()

    return [
        {
            "id": ex.id,
            "name": ex.name,
            "image_url": f"http://127.0.0.1:8000/images/{ex.image_url}",
            "description": ex.description
        }
        for ex in exercises
    ]


# -------------------------
# POST: Add new workout category
# (optional for admins)
# -------------------------
@router.post("/categories/add")
def add_category(name: str, db: Session = Depends(get_db)):
    new_cat = models.WorkoutCategory(name=name)
    db.add(new_cat)
    db.commit()
    db.refresh(new_cat)
    return {"message": "Category added", "id": new_cat.id}


# -------------------------
# POST: Add new exercise
# (optional for admins)
# -------------------------
@router.post("/exercises/add")
def add_exercise(category_id: int, name: str, image_url: str, description: str, db: Session = Depends(get_db)):

    # Validate category
    category = db.query(models.WorkoutCategory).filter(models.WorkoutCategory.id == category_id).first()
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")

    new_ex = models.Exercise(
        category_id=category_id,
        name=name,
        image_url=image_url,
        description=description,
    )
    db.add(new_ex)
    db.commit()
    db.refresh(new_ex)
    
    return {"message": "Exercise added", "id": new_ex.id}

 
