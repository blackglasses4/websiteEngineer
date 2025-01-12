import email
from sqlalchemy import Column, Integer, String, Boolean, Enum
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from pydantic import BaseModel, EmailStr
from backend.base import Base
from typing import Optional
import enum

class UserStatus(enum.Enum):
    PENDING = "Oczekujący"
    ACTIVE = "Aktywny"
    SUSPENDED = "Zawieszony"

class User(Base):
    __tablename__ = 'users' #Nazwa tabeli w bazie danych
    
    id = Column(Integer, primary_key=True, index=True)      #
    first_name = Column(String(255), unique=False, nullable=False)
    last_name = Column(String(255), unique=False, nullable=False)
    username = Column(String(255), unique=True, nullable=False)  #
    email = Column(String(255), unique=True, nullable=False)     #   Nazwy kolumn w bazie
    hashed_password = Column(String(255), nullable=False)       #
    is_admin = Column(Boolean, default=False, nullable=False)
    orders = relationship("Order", back_populates="user")  # Relacja do zamówień
    status = Column(Enum(UserStatus), default=UserStatus.PENDING)
    
class UserBase(BaseModel):
    first_name: str
    last_name: str
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str
    is_admin: Optional[bool] = False

class UserUpdate(BaseModel):
    first_name: str
    last_name: str
    username: str
    email: EmailStr
    is_admin: Optional[bool] = False

class UserOut(UserBase):
    id: int
    is_admin: bool
    status: UserStatus

    class Config:
        from_attributes = True
