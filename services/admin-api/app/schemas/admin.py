from pydantic import BaseModel, EmailStr, Field

class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1, max_length=128)

class RejectRequest(BaseModel):
    reason: str = Field(min_length=3, max_length=2000)

class AdminUserCreate(BaseModel):
    email: EmailStr
    password: str = Field(min_length=10, max_length=128)
    fullName: str = Field(min_length=2, max_length=120)
    role: str = Field(default="Admin", pattern=r"^(Admin|Reviewer|Owner)$")
