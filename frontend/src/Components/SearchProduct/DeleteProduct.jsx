import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeleteProduct = ({ productId, setProducts, setProductToDelete }) => {

    const handleDeleteProduct = async (id, toastId) => {
        if (!id) {
            console.error('ID is undefined or invalid');
            return;
        }

        try {
            // Wysyłamy zapytanie o usunięcie produktu
            const response = await fetch(`http://localhost:3001/products/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Wystąpił błąd podczas usuwania produktu.');
            }

            // Aktualizujemy stan produktów po usunięciu
            setProducts((prev) => prev.filter((product) => product.id !== id));

            // Wyświetlamy toast o sukcesie
            toast.success('Produkt został usunięty!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });

            // Zamykamy toast po zakończeniu operacji
            if (toastId) {
                toast.dismiss(toastId);
            }

        } catch (error) {
            // Wyświetlamy toast o błędzie
            toast.error(error.message || 'Nie udało się usunąć produktu.', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });

            // Zamykamy toast po błędzie
            if (toastId) {
                toast.dismiss(toastId);
            }

        } finally {
            // Resetujemy stan po zakończeniu operacji
            setProductToDelete(null);
        }
    };

    useEffect(() => {
        if (!productId) {
            console.error('Product ID is undefined or invalid');
            return;
        }

        // Tworzymy toast
        const id = toast.info(
            <div>
                <p>Czy na pewno chcesz usunąć ten produkt?</p>
                <div className="toast-div">
                    <button onClick={() => handleDeleteProduct(productId, id)}>Usuń</button>
                    <button onClick={() => handleCancel(id)}>Anuluj</button>
                </div>
            </div>,
            {
                className: "custom-toast",
                autoClose: false,
            }
        );

        // Funkcja czyszcząca
        return () => {
            if (id) {
                toast.dismiss(id);
            }
        };
    }, [productId, handleDeleteProduct]);  // Dodajemy handleDeleteProduct jako zależność

    const handleCancel = (id) => {
        if (id) {
            toast.dismiss(id);  // Zamykamy toast po anulowaniu
        }
    };

    return null;
};

export default DeleteProduct;
