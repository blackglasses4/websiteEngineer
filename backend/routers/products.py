from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import asc, desc
from typing import Optional
from backend.db_connect import SessionLocal
from backend.models import Product
from backend.models.product import ProductCreate, CategoryEnum, ProductResponse
from backend.utils.token import admin_required
from typing import List

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

@product_router.get("/products/all", response_model=List[ProductResponse])
def get_all_products(db: Session = Depends(get_db)):
    """
    Endpoint do pobierania wszystkich produktów.
    """
    products = db.query(Product).all()
    if not products:
        raise HTTPException(status_code=404, detail="Brak produktów w bazie danych")
    
    # Przekształcenie obiektów w słowniki
    return [ProductResponse.model_validate(product).model_dump() for product in products]

@product_router.get("/product/{id}", response_model=ProductResponse)
def get_single_product(id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Nie znaleziono produktów")
    return product

@product_router.post("/product")
def product_add(product: ProductCreate, db: Session = Depends(get_db), current_user: dict = Depends(admin_required)):

    # Tworzymy użytkownika w bazie danych
    new_product = Product(
        name=product.name,
        category=product.category,
        gender=product.gender,
        popular = product.popular,
        new_price=product.new_price,
        old_price=product.old_price,
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

@product_router.delete("/product/{id}")
def delete_product(id: int, db: Session = Depends(get_db),  current_user: dict = Depends(admin_required)):
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

@product_router.put("/product/{id}")
def update_product(id: int, product_data: ProductCreate, db: Session = Depends(get_db), current_user: dict = Depends(admin_required)):

    product = db.query(Product).filter(Product.id == id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Produkt nie istnieje")

    for field, value in product_data.dict(exclude_unset=True).items():
        setattr(product, field, value)

    db.commit()
    db.refresh(product)
    return {"message": "Produkt zaktualizowany", "product": product}

