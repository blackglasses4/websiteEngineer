import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import {BACKEND_URL} from '../config';
import { FaSlidersH } from 'react-icons/fa';
import useClick from '../useClick';

import '../Filter/Filter.scss';
import '../SearchProduct/Search.scss';

const SearchProduct = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const filterPanelRef = useRef(null);
    useClick(filterPanelRef, () => setIsFilterOpen(false));

    // stronicowanie
    const [page, setPage] = useState(1);
    const [firstPage, setFirstPage] = useState();
    const [prevPage, setPrevPage] = useState();
    const [nextPage, setNextPage] = useState();
    const [lastPage, setLastPage] = useState();

    const [numberOfPages, setNumberOfPages] = useState();
    const [numberOfItems, setNumberOfItems] = useState();

    //filtrowanie
    const [gender, setGender] = useState();
    //sortortowanie
    const [sort, setSort] = useState("none");

    const [orders, setOrders] = useState([]);
    const [confirmedResults, setConfirmedResults] = useState([]);

        const fetchOrders = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/orders`);
                const data = await response.json();
                setOrders(data);
                setConfirmedResults(data); 
            } catch (error) {
                toast.error('Nie udało się załadować zamówień.', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        };

    useEffect(() => {
        fetchOrders();
    }, [page, gender, sort]);

    const statusOrderChange = async (id, newStatus) => {
        try {
            const response = await fetch(`${BACKEND_URL}/orders/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) {
                throw new Error('Nie udało się zmienić statusu.');
            }

            const updatedOrders = orders.map((order) =>
                order.id === id ? { ...order, status: newStatus } : order
            );
            setOrders(updatedOrders);
            setConfirmedResults(updatedOrders);

            toast.success('Status zamówienia został zaktualizowany.');
        } catch (error) {
            toast.error(error.message || 'Wystąpił problem z aktualizacją statusu.');
        }
    };

    const handleConfirmDelete = (id) => {
        if(!id) {
            console.error('Id jest undefined');
            return;
        }
        
        const toastId = toast.info((
            <div>
                <p>Czy na pewno chcesz usunąć to zamówienie?</p>
                <div className='toast-div'>
                    <button onClick={() => handleDeleteProdukt(id, toastId)}>Usuń</button>
                    <button onClick={() => toast.dismiss(toastId)}>Anuluj</button>
                </div>
            </div>
        ), {
            className: "custom-toast",
            autoClose: false,
        });
              
    };    

    const handleDeleteProdukt = async (id, toastId) => {
        if (!id) {
            console.error('Id jest undefined');
            return;
        }

        try {
            const response = await fetch(`${BACKEND_URL}/orders/${id}`, {
                method: 'DELETE',
            });
    
            if (!response.ok) {
                throw new Error('Wystąpił błąd podczas usuwania zamówienia.');
            }
    
            setOrders((prev) => prev.filter((order) => order.id !== id));
    
            toast.success('Produkt został usunięty!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            toast.dismiss(toastId);
        } catch (err) {
            toast.error(err.message || 'Nie udało się usunąć zamówienia.', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            toast.dismiss(toastId);
        } finally {
            toast.dismiss(toastId);
        }
    };

    return (
        <div className="search-order">
            {/* <Filter fetchOrders={fetchOrders} /> */}
            
            <section className="admin-search_orders">
            {confirmedResults.length === 0 ? (
                <p className='search-empty'>Brak wyników do wyświetlenia. Spróbuj wyszukać zamówienie powyżej.</p>
            ) : (
                <table className="admin-search_table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Kupujący</th>
                            <th>Data</th>
                            <th>Adres (ulica, kod pocztowy, miasto)</th>
                            <th>Telefon</th>
                            <th>Produkty</th>
                            <th>Łączna kwota</th>
                            <th>Status</th>
                            <th>Uwagi</th>
                            <th>Usuń</th>
                        </tr>
                    </thead>
                    <tbody>
                        {confirmedResults.map((order) => (
                            <React.Fragment key={order.id}>
                                <tr>
                                    <td>{order.id}</td>
                                    <td>{order.customer}</td>
                                    <td>{new Date(order.date).toLocaleDateString('pl-PL')}</td>
                                    <td>
                                        {`${order.customerDetails.street} ${order.customerDetails.houseNumber}${
                                            order.customerDetails.apartmentNumber
                                                ? `/${order.customerDetails.apartmentNumber}`
                                                : ""
                                        }, ${order.customerDetails.postalCode} ${order.customerDetails.city}`}
                                    </td>
                                    <td>
                                        {order.customerDetails.phone}
                                    </td>
                                    <td>
                                        {order.items && Array.isArray(order.items) ? (
                                            order.items.map((product) => (
                                                <p key={product.productId}>
                                                    <span>Id:</span> {product.productId}, <span>Ilość:</span> {product.quantity}, <span>Cena:</span> {product.price} zł
                                                </p>
                                            ))
                                        ) : (
                                            <span>Brak produktów</span>
                                        )}
                                    </td>
                                    <td>{order.totalAmount} zł</td>
                                    <td>
                                        <select value={order.status || ""} onChange={(e) => statusOrderChange(order.id, e.target.value)}>
                                            <option value="">Wybierz status</option>
                                            <option value="W trakcie realizacji">W trakcie realizacji</option>
                                            <option value="Wysłane">Wysłane</option>
                                            <option value="Dostarczone">Dostarczone</option>
                                            <option value="Reklamacja">Reklamacja</option>
                                        </select>
                                    </td>
                                    <td>{order.customerDetails.comments ? order.customerDetails.comments.slice(0,25) + '...' : 'Brak komentarzy'}</td>
                                    <td>
                                        <button
                                            className='button-delete'
                                            onClick={() => handleConfirmDelete(order.id)}>
                                            Usuń
                                        </button>
                                    </td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            )}
            </section>

            <section className="admin-search_orders-mobile">
                {confirmedResults.length === 0 ? (
                    <p className='search-empty'>Brak wyników do wyświetlenia. Spróbuj wyszukać produkt powyżej.</p>
                ) : (
                    <div className="search-mobile">
                        {confirmedResults.map((order) => (
                            <div className="search-mobile_product" key={order.id}>
                                <div className="product-details">
                                    <p><span>ID: </span>{order.id}</p>
                                    <p><span>Kupujący: </span>{order.customer}</p>
                                    <p><span>Data: </span>{new Date(order.date).toLocaleDateString('pl-PL')}</p>
                                    <p><span>Numer domu/mieszkania: </span>
                                        {`${order.customerDetails.houseNumber}${
                                            order.customerDetails.apartmentNumber
                                                ? `/${order.customerDetails.apartmentNumber}`
                                                : ""
                                        }`}
                                    </p>
                                    <p><span>Ulica: </span>{order.customerDetails.street > 20 ? `${order.customerDetails.street.slice(0, 20)}...` : order.customerDetails.street}</p>
                                    <p><span>Kod pocztowy: </span>{order.customerDetails.postalCode}</p>
                                    <p><span>Miasto: </span>{order.customerDetails.city}</p>
                                    <p><span>Telefon: </span>{order.customerDetails.phone}</p>  
                                    <p><span>Produkty: </span>{order.items && Array.isArray(order.items) ? (
                                            order.items.map((product) => (
                                                <p key={product.productId}>
                                                    <span>Id:</span> {product.productId}, <span>Ilość:</span> {product.quantity}, <span>Cena:</span> {product.price} zł
                                                </p>
                                            ))
                                        ) : (
                                            <span>Brak produktów</span>
                                        )}</p>  
                                    <p><span>Całkowita cena: </span>{order.totalAmount} zł</p>  
                                    <p><span>Status: </span>
                                        <select value={order.status || ""} onChange={(e) => statusOrderChange(order.id, e.target.value)}>
                                            <option value="">Wybierz status</option>
                                            <option value="W trakcie realizacji">W trakcie realizacji</option>
                                            <option value="Wysłane">Wysłane</option>
                                            <option value="Dostarczone">Dostarczone</option>
                                            <option value="Reklamacja">Reklamacja</option>
                                        </select>
                                    </p>  
                                    <p><span>Uwagi: </span>{order.customerDetails.comments ? order.customerDetails.comments.slice(0,50) + '...' : 'Brak komentarzy'}</p>  
                                    <div className="mobile-button">
                                        <button className='button-delete' onClick={() => handleConfirmDelete(order.id)}>Usuń</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default SearchProduct;
