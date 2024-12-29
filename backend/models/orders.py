import enum
from re import S
from unicodedata import category
from sqlalchemy import Column, ForeignKey, Integer, String, Enum, null
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy_imageattach.entity import Image , image_attachment
from typing import Optional
from pydantic import BaseModel
from backend.base import Base

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

class OrderCreate(BaseModel):

    phone: int
    street: str
    postal_code: str
    city: str
    house_number: Optional[int] = None
    apartment_number: Optional[int] = None
    comment: Optional[str] = None
    
    class Config:
        from_attributes = True  # Allows compatibility with SQLAlchemy models