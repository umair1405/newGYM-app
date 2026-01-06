from pydantic import BaseModel, EmailStr, Field

class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8, max_length=64)
    
class LoginRequest(BaseModel):
    email: EmailStr
    password: str
class LoginResponse(BaseModel):
    id: int
    email: EmailStr
