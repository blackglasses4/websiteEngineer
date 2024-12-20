from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy_imageattach.entity import Image , image_attachment

Base = declarative_base()

class Product(Base):
    __tablename__ = 'products' #Nazwa tabeli w bazie danych
    
    id = Column(Integer, primary_key=True, index=True)      #
    name = Column(String(255), nullable=False)  #
    price = Column(Integer, nullable=False)        # Nazwy kolumn w bazie
    amount = Column(Integer, nullable=False)     #   
    picture = image_attachment('product_picture')
    
class ProductPicture(Base, Image):
    product_id = Column(Integer, ForeignKey('products.id'), primary_key=True)
    product = relationship('Product')
    __tablename__ = 'products_images'