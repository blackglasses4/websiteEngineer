from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from backend.db_connect import SessionLocal
from backend.models import Order
from backend.models.orders import OrderCreate, StatusEnum, UpdateOrderStatusRequest
from datetime import datetime
from backend.utils.token import get_current_user
from sqlalchemy.orm import joinedload
from backend.utils.token import admin_required

#Tworzenie instancji routera
order_router = APIRouter()

# Zależność do uzyskania sesji bazy danych
def get_db():
    db = SessionLocal()  # Tworzymy sesję bazy danych
    try:
        yield db  # Zwracamy sesję do użycia w endpointach
    finally:
        db.close()  # Po zakończeniu zapytania sesja jest zamykana

@order_router.get("/orders")
def get_orders(
    page: int = Query(1, ge=1),
    per_page: int = Query(8, ge=1),
    db: Session = Depends(get_db),
):
    # Pobranie zapytań dotyczących zamówień
    query = db.query(Order).options(joinedload(Order.user)) 

    # Liczba wszystkich zamówień
    total_orders = query.count()

    # Paginacja
    query = query.offset((page - 1) * per_page).limit(per_page)
    orders = query.all()

    # Obliczanie liczby stron
    total_pages = (total_orders + per_page - 1) // per_page

    return {
        "data": orders,
        "first": 1,
        "prev": page - 1 if page > 1 else None,
        "next": page + 1 if page < total_pages else None,
        "last": total_pages,
        "pages": total_pages,
        "orders": total_orders,
    }

@order_router.post("/order")
def order_add(order: OrderCreate, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
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
        products_order = order.products_order,
        user_id = current_user["id"]  # Powiązanie z użytkownikiem
    )

    # Dodanie produktu do sesji i zapisanie do bazy danych
    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    return new_order
    
@order_router.delete("/order/{id}")
def delete_order(id: int, db: Session = Depends(get_db), current_user: dict = Depends(admin_required)):
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

@order_router.patch("/order/{id}")
def update_order_status(id: int, request: UpdateOrderStatusRequest, db: Session = Depends(get_db), current_user: dict = Depends(admin_required)):
    status_map = {
        "W_trakcie_realizacji": StatusEnum.W_trakcie_realizacji,
        "Oplacone": StatusEnum.Oplacone,
        "Wyslane": StatusEnum.Wyslane,
        "Dostarczone": StatusEnum.Dostarczone,
        "Reklamacja": StatusEnum.Reklamacja,
    }

    new_status = status_map.get(request.status)
    if not new_status:
        raise HTTPException(status_code=400, detail="Niepoprawny status")

    order = db.query(Order).filter(Order.id == id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Nie znaleziono zamówienia")

    print(f"Zmieniam status zamówienia {id} z {order.status} na {new_status.value}")
    order.status = new_status.value
    db.commit()
    db.refresh(order)
    print(f"Status po zapisaniu w bazie: {order.status}")

    return {"id": order.id, "status": order.status}