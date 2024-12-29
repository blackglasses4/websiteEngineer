import enum
from re import S
from unicodedata import category
from sqlalchemy import Column, ForeignKey, Integer, String, Enum, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy_imageattach.entity import Image , image_attachment
from typing import Optional
from pydantic import BaseModel
from backend.base import Base

class GenderEnum(enum.Enum):
    man = "Mężczyźni"
    woman = "Kobiety"
    unisex = "Dla obu płci"
    
class CategoryEnum(enum.Enum):
    shirt = "koszulka"
    jacket = "kurtka"
    pants = "spodnie"
    hat = "czapka"
    outfit = "stroje"

class SizeEnum(enum.Enum):
    xs= "XS"
    s = "S"
    m = "M"
    l = "L"
    xl = "XL"
    xxl = "XXL"

class ColorEnum(enum.Enum):
    white = "white"
    black = "black"
    lime = "lime"
    gray = "gray"
    red = "red"
    green = "green"
    blue = "blue"
    pink = "pink"
    navy = "navy"
    purple = "purple"
    yellow = "yellow"
    turquoise = "turquoise"
    darkgreen = "darkgreen"
    darkcyan = "darkcyan"
    coral = "coral" 

class MaterialEnum(enum.Enum):
    poliester = "Poliester"
    cotton_wool = "Bawełna"
    elastan = "Elastan"
    spandex = "Spandex"
    nylon = "Nylon"
    poliamid = "Poliamid"
    polar = "Polar"
    puch = "Puch"

class Product(Base):
    __tablename__ = 'products' #Nazwa tabeli w bazie danych
    
    id = Column(Integer, primary_key=True, index=True)      #
    name = Column(String(255), nullable=False) 
    category = Column(Enum(CategoryEnum), nullable=False)
    gender = Column(Enum(GenderEnum), nullable=False)
    popular = Column(Boolean, default=False, nullable=False)
    new_price = Column(Integer, nullable=False)
    old_price = Column(Integer, nullable=True)        # Nazwy kolumn w bazie
    amount = Column(Integer, nullable=True)     #
    description = Column(String(255), nullable=True) 
    picture = image_attachment('ProductPicture')
    size = Column(Enum(SizeEnum), nullable=False)
    color = Column(Enum(ColorEnum), nullable=False)
    material = Column(Enum(MaterialEnum), nullable=False)
    
    # Establish bidirectional relationship
    pictures = relationship('ProductPicture', back_populates='product')

class ProductCreate(BaseModel):
    name: str
    category: CategoryEnum
    gender: GenderEnum
    popular: Optional[bool] = False
    new_price: int
    old_price: Optional[int] = None
    amount: Optional[int] = None
    description: Optional[str] = None
    picture: Optional[str] = None  # Path or URL to the image
    size: SizeEnum
    color: ColorEnum
    material: MaterialEnum

class ProductResponse(BaseModel):
    id: int
    name: str
    category: CategoryEnum
    gender: GenderEnum
    popular: bool
    new_price: int
    old_price: Optional[int]
    amount: Optional[int]
    description: Optional[str]
    size: SizeEnum
    color: ColorEnum
    material: MaterialEnum
    picture: Optional[str]  # Include serialized path/URL for the image if needed
    
    class Config:
        from_attributes = True  # Allows compatibility with SQLAlchemy models