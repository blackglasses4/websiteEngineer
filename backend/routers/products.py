from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from backend.db_connect import SessionLocal
from backend.models import Product
from backend.models.product import ProductCreate

# Tworzenie instancji routera
product_router = APIRouter()

# Zależność do uzyskania sesji bazy danych
def get_db():
    db = SessionLocal()  # Tworzymy sesję bazy danych
    try:
        yield db  # Zwracamy sesję do użycia w endpointach
    finally:
        db.close()  # Po zakończeniu zapytania sesja jest zamykana
        

@product_router.post("/products")
def product_add(product: ProductCreate, db: Session = Depends(get_db)):
    # Tworzymy użytkownika w bazie danych
    new_product = Product(
        name = product.name,
        category = product.category,
        gender = product.gender,
        new_price = product.new_price,
        old_price = product.old_price,
        amount = product.amount,
        description = product.description,
        picture = product.picture
    )
    
    # Dodanie użytkownika do sesji i zapisanie do bazy danych
    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    return new_product  # Zwracamy stworzonego użytkownika



@product_router.get("/products")
def get_product_list(db: Session = Depends(get_db)):
    products = db.query(Product).all()  # Query all products from the database
    if not products:
        raise HTTPException(status_code=404, detail="No products found")
    return products
   
     