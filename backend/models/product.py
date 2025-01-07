import enum
from re import S
from unicodedata import category
from sqlalchemy import Column, ForeignKey, Integer, String, Enum, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from typing import Optional
from pydantic import BaseModel
from backend.base import Base

class GenderEnum(enum.Enum):
    man = "mężczyźni"
    woman = "kobiety"
    unisex = "dla obu płci"

class CategoryEnum(enum.Enum):
    shirt = "koszulka"
    jacket = "kurtka"
    pants = "spodnie"
    hat = "czapka"
    outfit = "stroje"

# class SizeEnum(enum.Enum):
#     xs= "XS"
#     s = "S"
#     m = "M"
#     l = "L"
#     xl = "XL"
#     xxl = "XXL"

# class SizeEnum(enum.Enum):
#     extra_small = "XS"
#     small = "S"
#     medium = "M"
#     large = "L"
#     extra_large = "XL"
#     extra_extra_large = "XXL"


# class ColorEnum(enum.Enum):
#     white = "white"
#     black = "black"
#     lime = "lime"
#     gray = "gray"
#     red = "red"
#     green = "green"
#     blue = "blue"
#     pink = "pink"
#     navy = "navy"
#     purple = "purple"
#     yellow = "yellow"
#     turquoise = "turquoise"
#     darkgreen = "darkgreen"
#     darkcyan = "darkcyan"
#     coral = "coral"

class MaterialEnum(enum.Enum):
    poliester = "poliester"
    cotton_wool = "bawełna"
    elastan = "elastan"
    spandex = "spandex"
    nylon = "nylon"
    poliamid = "poliamid"
    polar = "polar"
    puch = "puch"

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
    picture = Column(String(255), nullable=True)
    sizes = Column(String(255), nullable=False)
    colors = Column(String(255), nullable=False)
    material = Column(Enum(MaterialEnum), nullable=False)

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
    sizes: str
    colors: str
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
    sizes: str
    colors: str
    material: MaterialEnum
    picture: Optional[str]  # Include serialized path/URL for the image if needed
    class Config:
        from_attributes = True  # Allows compatibility with SQLAlchemy models
        
