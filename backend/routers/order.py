from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from backend.db_connect import SessionLocal
from backend.models import Order
from backend.models.orders import OrderCreate


#Tworzenie instancji routera
order_router = APIRouter()

# Zależność do uzyskania sesji bazy danych
def get_db():
    db = SessionLocal()  # Tworzymy sesję bazy danych
    try:
        yield db  # Zwracamy sesję do użycia w endpointach
    finally:
        db.close()  # Po zakończeniu zapytania sesja jest zamykana
        
@order_router.post("/orders")
def order_add(order: OrderCreate, db: Session = Depends(get_db)):
    # Tworzymy użytkownika w bazie danych
    new_order = Order(
        phone = order.phone,
        street = order.street,
        postal_code = order.postal_code,
        city = order.city,
        house_number = order.house_number,
        apartment_number = order.apartment_number,
        comment = order.comment
    )

    # Dodanie produktu do sesji i zapisanie do bazy danych
    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    return new_order

@order_router.get("/orders")
def get_orders(
    page: int = Query(1, ge=1),
    per_page: int = Query(8, ge=1),
    db: Session = Depends(get_db),
):
    # Pobranie zapytań dotyczących zamówień
    query = db.query(Order)

    # Liczba wszystkich zamówień
    total_items = query.count()

    # Paginacja
    query = query.offset((page - 1) * per_page).limit(per_page)
    orders = query.all()

    # Obliczanie liczby stron
    total_pages = (total_items + per_page - 1) // per_page

    return {
        "data": orders,
        "first": 1,
        "prev": page - 1 if page > 1 else None,
        "next": page + 1 if page < total_pages else None,
        "last": total_pages,
        "pages": total_pages,
        "items": total_items,
    }
    
    