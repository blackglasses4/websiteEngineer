import enum
from unicodedata import category
from sqlalchemy import Column, ForeignKey, Integer, String, Enum
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy_imageattach.entity import Image , image_attachment
from backend.base import Base

class GenderEnum(enum.Enum):
    man = "Mężczyźni"
    woman = "Kobiety"
    unisex = "Dla obu płci"
    
class CategoryEnum(enum.Enum):
    shirt = "Koszulka"
    jacket = "Kurtka"
    pants = "Spodnie"
    hat = "Czapka"
    outfit = "Stroje"

class Product(Base):
    __tablename__ = 'products' #Nazwa tabeli w bazie danych
    
    id = Column(Integer, primary_key=True, index=True)      #
    name = Column(String(255), nullable=False) 
    category = Column(Enum(CategoryEnum), nullable=False)
    gender = Column(Enum(GenderEnum), nullable=False)
    new_price = Column(Integer, nullable=False)
    old_price = Column(Integer, nullable=True)        # Nazwy kolumn w bazie
    amount = Column(Integer, nullable=False)     #
    description = Column(String(255), nullable=True) 
    picture = image_attachment('ProductPicture')
    
    # Establish bidirectional relationship
    pictures = relationship('ProductPicture', back_populates='product')
