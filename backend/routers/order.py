from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from backend.db_connect import SessionLocal
from backend.models import Order
from backend.models.orders import OrderCreate, StatusEnum
from datetime import datetime 

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
    if not order.date:
        order.date = datetime.utcnow()

    new_order = Order(
        phone = int(order.phone),
        street = order.street,
        postal_code = order.postal_code,
        city = order.city,
        house_number = order.house_number if order.house_number else None,
        apartment_number = order.apartment_number if order.apartment_number else None,
        comment = order.comment,
        status=StatusEnum(order.status),
        date = order.date,
        total_amount = int(order.total_amount),
        products_order = order.products_order
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
    
@order_router.delete("/order/{id}")
def delete_order(id: int, db: Session = Depends(get_db)):
    # Query the user by ID
    order = db.query(Order).filter(Order.id == id).first()
    
    # If the user does not exist, raise a 404 error
    if order is None:
        raise HTTPException(status_code=404, detail="Nie znaleziono zamówienia")
    
    # Delete the user from the database
    db.delete(order)
    db.commit()

    # Return a success message
    return {"message": f"Zamówienie o ID {id} zostało usunięte pomyślnie."}

@order_router.patch("/orders/{id}")
def update_order_status(id: int, status: str, db: Session = Depends(get_db)):
    try:
        # Przekształcamy status w stringu na odpowiedni enum
        new_status = StatusEnum[status.upper()]
    except KeyError:
        raise HTTPException(status_code=400, detail="Niepoprawny status")

    # Wyszukujemy zamówienie po ID
    order = db.query(Order).filter(Order.id == id).first()
    
    # Jeśli zamówienie nie istnieje, rzucamy wyjątek
    if order is None:
        raise HTTPException(status_code=404, detail="Nie znaleziono zamówienia")

    # Zaktualizowanie statusu (przypisujemy enum, a nie string)
    order.status = new_status
    db.commit()
    db.refresh(order)

    # Zwracamy zaktualizowane zamówienie
    return order