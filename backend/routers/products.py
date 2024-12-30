from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import asc, desc
from typing import Optional
from backend.db_connect import SessionLocal
from backend.models import Product
from backend.models.product import ProductCreate, CategoryEnum, ProductResponse

# Tworzenie instancji routera
product_router = APIRouter()

# Zależność do uzyskania sesji bazy danych
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@product_router.get("/products")
def get_product_list(
    page: int = Query(1, ge=1),
    per_page: int = Query(8, ge=1),
    gender: Optional[str] = None,
    popular: Optional[bool] = None,
    category: Optional[CategoryEnum] = None,
    sort: Optional[str] = None,
    db: Session = Depends(get_db),
):
    print(f"Received filters: gender={gender}, sort={sort}")
    query = db.query(Product)

    # Filtrowanie według płci
    if gender:
        query = query.filter(Product.gender == gender)

    if popular:
        query = query.filter(Product.popular == popular)

    if category:
        query = query.filter(Product.category == category)

    # Sortowanie
    if sort == "new_price":
        query = query.order_by(asc(Product.new_price))
    elif sort == "-new_price":
        query = query.order_by(desc(Product.new_price))

    # Liczba wszystkich wyników
    total_items = query.count()

    # Paginacja
    query = query.offset((page - 1) * per_page).limit(per_page)
    products = query.all()

    # Obliczanie liczby stron
    total_pages = (total_items + per_page - 1) // per_page

    return {
        "data": products,
        "first": 1,
        "prev": page - 1 if page > 1 else None,
        "next": page + 1 if page < total_pages else None,
        "last": total_pages,
        "pages": total_pages,
        "items": total_items,
    }

@product_router.post("/products")
def product_add(product: ProductCreate, db: Session = Depends(get_db)):

    # Tworzymy użytkownika w bazie danych
    new_product = Product(
        name=product.name,
        category=product.category,
        gender=product.gender,
        popular = product.popular,
        new_price=product.new_price,
        old_price=product.old_price,
        amount=product.amount,
        description=product.description,
        picture=product.picture,
        sizes = product.sizes,
        colors = product.colors,
        material = product.material
    )

    # Dodanie produktu do sesji i zapisanie do bazy danych
    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    return new_product

@product_router.get("/product/{id}", response_model=ProductResponse)
def get_single_product(id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Nie znaleziono produktów")
    return product

@product_router.delete("/product/{id}")
def delete_product(id: int, db: Session = Depends(get_db)):
    # Query the user by ID
    product = db.query(Product).filter(Product.id == id).first()
    
    # If the user does not exist, raise a 404 error
    if product is None:
        raise HTTPException(status_code=404, detail="Nie znaleziono produktu")
    
    # Delete the user from the database
    db.delete(product)
    db.commit()

    # Return a success message
    return {"message": f"Produkt o ID {id} został usunięty pomyślnie."}