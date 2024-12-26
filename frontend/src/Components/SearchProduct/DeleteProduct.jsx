import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeleteProduct = ({ productId, setProducts, setProductToDelete }) => {

    const handleDeleteProduct = async (id, toastId) => {
        if (!id) {
            console.error('Id jest undefined');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3001/products/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Wystąpił błąd podczas usuwania produktu.');
            }

            setProducts((prev) => prev.filter((product) => product.id !== id));

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
            toast.error(error.message || 'Nie udało się usunąć produktu.', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });

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
            console.error('Id produktu jest undefined');
            return;
        }

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
    }, [productId, handleDeleteProduct]);

    const handleCancel = (id) => {
        if (id) {
            toast.dismiss(id);
        }
    };

    return null;
};

export default DeleteProduct;
