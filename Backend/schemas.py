from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from pydantic import ConfigDict

class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8, max_length=64)
    
class LoginRequest(BaseModel):
    email: EmailStr
    password: str
    
class LoginResponse(BaseModel):
    user_id: int
    email: EmailStr
    

