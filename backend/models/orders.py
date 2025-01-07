import enum
from ipaddress import collapse_addresses
from re import S
import string
from unicodedata import category
from sqlalchemy import Column, ForeignKey, Integer, String, Enum, null, DateTime
from sqlalchemy import func
from datetime import datetime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from typing import Optional
from pydantic import BaseModel
from backend.base import Base

class StatusEnum(enum.Enum):
    W_trakcie_realizacji = "W_trakcie_realizacji"
    Oplacone = "Oplacone"
    Wyslane = "Wyslane"
    Dostarczone = "Dostarczone"
    Reklamacja = "Reklamacja"

class Order(Base):
    __tablename__ = 'orders' #Nazwa tabeli w bazie danych
    
    id = Column(Integer, primary_key=True, index=True)      #
    phone = Column(Integer, nullable=False)
    street = Column(String(255), nullable=False)
    postal_code = Column(String(255), nullable=False)
    city = Column(String(255), nullable=False)
    house_number = Column(Integer, nullable=True)
    apartment_number = Column(Integer, nullable=True)
    comment = Column(String(255), nullable=True)
    status = Column(Enum(StatusEnum), default=StatusEnum.W_trakcie_realizacji)
    date = Column(DateTime, default=func.now())
    total_amount = Column(Integer, nullable=False)
    products_order = Column(String(255), nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)  # Klucz obcy do tabeli users
    user = relationship("User", back_populates="orders")  # Relacja do użytkownika
    
class UpdateOrderStatusRequest(BaseModel):
    status: str
class OrderCreate(BaseModel):

    phone: int
    street: str
    postal_code: str
    city: str
    house_number: Optional[int] = None
    apartment_number: Optional[int] = None
    comment: Optional[str] = None
    status: StatusEnum
    date: Optional[datetime] = None
    total_amount: int
    products_order: str
    user_id: int  # Wskazuje na użytkownika
    
    class Config:
        from_attributes = True  # Allows compatibility with SQLAlchemy models