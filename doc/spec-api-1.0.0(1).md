# API

## Produkty

### Pobieranie listy produktów

GET `/products?gender=women&_sort=new_price&_page=1&_per_page=25`

#### Parametry w URL-u

Wszystkie są opcjonalne.

##### Filtrowanie

`<NAZWA_ATRYBUTU>`=`<WARTOŚĆ>`

Uwaga: w pierwszej wersji wystarczy:

- `gender` - filtrowanie wg płci (wartości: `men`, `women`)

##### Sortowanie

- `_sort` - sortowanie wg określonych pól po przecinku gdzie `-` oznacza kierunek malejący (desc)

Przykładowo: `_sort=-category,new_price` oznacza, że sortujemy najpierw wg kategorii malejąco, a następnie wg nowej ceny rosnąco

Uwaga: W pierwszej wersji wystarczy tylko po polu `new_price` rosnąco.

Uwaga: Brak parametru `_sort` oznacza brak sortowania.

##### Stronicowanie

- `_page` - numer strony
- `_per_page` - liczba elementów na stronie (domyślnie 10)

Uwaga: Brak parametru `_page` oznacza brak sortowania.
Uwaga: Dla parametru `_per_page` podanie większej wartości niż `100` powinno spowodować błąd `400 Bad Request`.

#### Odpowiedź

W zależności od tego czy występuje stronicowanie czy nie w wyniku zwracany jest obiekt z dodatkowymi atrybutami dotyczącymi stronicowania albo zwykła lista.

Uwaga: atrybut `description` nie powinien być zwracany.

##### W przypadku braku stronicowania

Zwracana jest lista pozycji.

Przykład:

```json
[
    {
        "id": "2",
        "category": "koszulka",
        "gender": "women",
        "name": "Koszulka sportowa",
        "popular": true,
        "image": {
            "url": "http://localhost:3001/shirt_women2.jpg",
            "alt": "Koszulka sportowa dla kobiet"
        },
        "new_price": 35,
        "old_price": 80,
        "attributes": {
            "sizes": [
                "S",
                "M",
                "L",
                "XL"
            ],
            "color": [
                "black",
                "white",
                "blue",
                "red"
            ],
            "material": "poliester",
            "stock": 100
        },
        "isLiked": false
    },
    {
        "id": "6",
        "category": "koszulka",
        "gender": "women",
        "name": "Koszulka do jogi",
        "popular": false,
        "image": {
            "url": "http://localhost:3001/shirt_women6.jpg",
            "alt": "Koszulka do jogi dla kobiet"
        },
        "new_price": 35,
        "old_price": 70,
        "attributes": {
            "sizes": [
                "S",
                "M",
                "L"
            ],
            "color": [
                "white",
                "grey",
                "lime"
            ],
            "material": "bawełna",
            "stock": 100
        },
        "isLiked": false
    }
]
```

##### W przypadku stronicowania

Zwracany jest obiekt z następującymi atrybutami:

- first - nr pierwszej strony
- prev - nr poprzedniej strony albo null w przypadku braku
- next - nr następnej strony albo null w przypadku braku
- last - nr ostatniej strony
- liczba stron
- liczba wszystkich pozycji
- data - lista pozycji

Przykład:

```json
{
    "first": 1,
    "prev": null,
    "next": 2,
    "last": 2,
    "pages": 2,
    "items": 36,
    "data": [
      {
        "id": "2",
        "category": "koszulka",
        "gender": "women",
        "name": "Koszulka sportowa",
        "popular": true,
        "image": {
            "url": "http://localhost:3001/shirt_women2.jpg",
            "alt": "Koszulka sportowa dla kobiet"
        },
        "new_price": 35,
        "old_price": 80,
        "description": "Lekka koszulka sportowa, idealna na treningi.",
        "attributes": {
            "sizes": [
                "S",
                "M",
                "L",
                "XL"
            ],
            "color": [
                "black",
                "white",
                "blue",
            ],
            "material": "poliester",
            "stock": 100
        },
        "isLiked": false
      },
      {
        "id": "6",
        "category": "koszulka",
        "gender": "women",
        "name": "Koszulka do jogi",
        "popular": false,
        "image": {
          "url": "http://localhost:3001/shirt_women6.jpg",
          "alt": "Koszulka do jogi dla kobiet"
        },
        "new_price": 35,
        "old_price": 70,
        "description": "Koszulka do jogi, wygodna i elastyczna, wykonana z naturalnych materiałów.",
        "attributes": {
        "sizes": [
            "S",
            "M",
            "L"
        ],
        "color": [
            "white",
            "grey",
            "lime"
        ],
        "material": "bawełna",
        "stock": 100
        },
        "isLiked": false
      }
    ]
}
```

### Tworzenie nowego produktu

POST `/products`

#### Body

```json
{
    "category": "koszulka",
    "gender": "women",
    "name": "Koszulka sportowa",
    "popular": true,
    "image": {
        "url": "http://localhost:3001/shirt_women2.jpg",
        "alt": "Koszulka sportowa dla kobiet"
    },
    "new_price": 35,
    "old_price": 80,
    "description": "Lekka koszulka sportowa, idealna na treningi.",
    "attributes": {
        "sizes": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "color": [
            "black",
            "white",
            "blue",
            "red"
        ],
        "material": "poliester",
        "stock": 100
    },
    "isLiked": false
}
```

#### Odpowiedź

##### Status

- `201 Created` w przypadku powodzenia

##### Body

Przesłany obiekt uzupełniony o atrybut `id`.


### Aktualizacja produktu

POST `/products/<PRODUCT_ID>`

#### Body

```json
{
    "category": "koszulka",
    "gender": "women",
    "name": "Koszulka sportowa",
    "popular": true,
    "image": {
        "url": "http://localhost:3001/shirt_women2.jpg",
        "alt": "Koszulka sportowa dla kobiet"
    },
    "new_price": 35,
    "old_price": 80,
    "description": "Lekka koszulka sportowa, idealna na treningi.",
    "attributes": {
        "sizes": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "color": [
            "black",
            "white",
            "blue",
            "red"
        ],
        "material": "poliester",
        "stock": 100
    },
    "isLiked": false
}
```

#### Odpowiedź

##### Status

- `200 OK` w przypadku powodzenia

##### Body

Przesłany obiekt uzupełniony o atrybut `id`.


### Usunięcie produktu

DELETE `/products/<ID_PRODUKTU>`

#### Odpowiedź

##### Status

- `204 No Content` - w przypadku powodzenia

##### Body

Puste.


## Użytkownicy

### Pobieranie listy użytkowników

GET `/users`

#### Filtrowanie

Tak jak dla produktów.

#### Sortowanie

Tak jak dla produktów.

#### Stronicowanie

Tak jak dla produktów.

Uwaga: w pierwszej wersji może nie być filtrowania, sortowania i stronicowania.

#### Odpowiedź

##### W przypadku braku stronicowania

```json
[
  {
    "id": "1",
    "firstname": "Adrianna",
    "lastname": "Pawłowska",
    "username": "adriannapx",
    "password": ""
  },
  {
    "id": "7605",
    "firstname": "Jan",
    "lastname": "Kowalski",
    "username": "jank",
    "password": ""
  }
]
```

Uwaga: Wartość atrybutu `password` nie powinna być zwracana albo atrybut powinien zostać pominięty.


### Tworzenie nowego użytkownika

POST `/users`

#### Body

```json
{
    "firstname": "Janina",
    "lastname": "Kowalska",
    "username": "janinak",
    "password": "hasło"
}
```

#### Odpowiedź

##### Status

- `201 Created` w przypadku powodzenia

##### Body

Przesłany obiekt uzupełniony o atrybut `id`.

Uwaga: Wartość atrubutu `password` nie może być zwrócona albo atrybut musi zostać pominięty!!!


### Aktualizacja użytkownika

PUT `/users/<USER_ID>`

#### Body

```json
{
    "firstname": "Janina",
    "lastname": "Kowalska",
    "username": "janinak",
    "password": "hasło"
}
```

#### Odpowiedź

##### Status

- `201 Created` w przypadku powodzenia

##### Body

Przesłany obiekt uzupełniony o atrybut `id`.

Uwaga: Wartość atrubutu `password` nie może być zwrócona albo atrybut musi zostać pominięty!!!


### Usunięcie użytkownika

DELETE `/users/3`

#### Odpowiedź

##### Status

- `204 No Content` - w przypadku powodzenia

##### Body

Puste.


## Zamówienia

### Pobieranie listy zamówień

GET `/orders`

#### Filtrowanie

Tak jak dla produktów.

#### Sortowanie

Tak jak dla produktów.

#### Stronicowanie

Tak jak dla produktów.

Uwaga: w pierwszej wersji może nie być filtrowania, sortowania i stronicowania.

#### Osadzanie obiektów podrzędnych

- `_embed` - nazwa obiektu do osadzenia - w tym przypadku może przyjmować wartości `users` albo `order`.

#### Odpowiedź

##### W przypadku braku stronicowania oraz gdy `_embed=user&_embed=product`

```json
[
    {
        "userId": "1",
        "productId": "3",
        "id": "0ace",
        "user": {
            "id": "1",
            "firstname": "Adrianna",
            "lastname": "Pawłowska",
            "username": "adriannapx",
            "password": ""
        },
        "product": {
            "id": "3",
            "category": "koszulka",
            "gender": "women",
            "name": "Koszulka treningowa",
            "popular": false,
            "image": {
                "url": "http://localhost:3001/shirt_women3.jpg",
                "alt": "Koszulka treningowa dla kobiet"
            },
            "new_price": 45,
            "old_price": 90,
            "description": "Koszulka do intensywnych treningów, przewiewna i elastyczna.",
            "attributes": {
                "sizes": [
                    "S",
                    "M",
                    "L"
                ],
                "color": [
                    "grey",
                    "pink",
                    "green"
                ],
                "material": "bawełna",
                "stock": 80
            },
            "isLiked": false
        }
    },
    {
        "id": "8ab8",
        "userId": "1",
        "productId": "1",
        "user": {
            "id": "1",
            "firstname": "Adrianna",
            "lastname": "Pawłowska",
            "username": "adriannapx",
            "password": ""
        },
        "product": {
            "id": "1",
            "category": "koszulka",
            "gender": "women",
            "name": "Koszulka sportowa",
            "image": {
                "url": "http://localhost:3001/shirt_women1.jpg",
                "alt": "Koszulka sportowa dla kobiet"
            },
            "popular": false,
            "new_price": 40,
            "old_price": 80,
            "description": "Lekka koszulka sportowa, idealna na treningi.",
            "attributes": {
                "sizes": [
                    "S",
                    "M",
                    "L",
                    "XL"
                ],
                "color": [
                    "black",
                    "white",
                    "blue",
                    "red",
                    "navy"
                ],
                "material": "poliester"
            },
            "isLiked": false
        }
    }
]
```

### Tworzenie nowego zamówienia

Przechowujemy tam userId, i atrybuty do zamawiania. 

POST `/orders`

#### Body

```json
{
    "userId": "1",
    "firstName": "",
    "lastName": "",
    "phone": "",
    "street": "",
    "postalCode": "",
    "city": "",
    "houseNumber": "",
    "apartmentNumber": "",
}
```

#### Odpowiedź

##### Status

- `201 Created` w przypadku powodzenia

##### Body

Przesłany obiekt uzupełniony o atrybut `id`.


### Aktualizacja zamówienia

PUT `/orders/<ORDER_ID>`

#### Body

```json
{
    "userId": "1",
    "firstName": "",
    "lastName": "",
    "phone": "",
    "street": "",
    "postalCode": "",
    "city": "",
    "houseNumber": "",
    "apartmentNumber": "",
}
```

#### Odpowiedź

##### Status

- `201 Created` w przypadku powodzenia

##### Body

Przesłany obiekt uzupełniony o atrybut `id`.


### Usunięcie zamówienia

DELETE `/orders/3`

#### Odpowiedź

##### Status

- `204 No Content` - w przypadku powodzenia

##### Body

Puste.

### Dodanie produktów do zamówienia

Dodajemy Listę produktów z koszyka do zamówienia.
Dodatkowo również ilość tych produktów.

```json
{
    "productId": "",
    "count":""
```
