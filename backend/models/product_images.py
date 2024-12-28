from sqlalchemy import Column, ForeignKey, Integer, String, Enum
from sqlalchemy.orm import relationship
from sqlalchemy_imageattach.entity import Image , image_attachment
from backend.base import Base

class ProductPicture(Base, Image):
    __tablename__ = 'products_images'

    product_id = Column(Integer, ForeignKey('products.id'), primary_key=True)
    product = relationship('Product', back_populates='pictures')  # Link back to Product