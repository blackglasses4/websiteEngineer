import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './EditProduct.scss';

const EditProduct = ({ product, onSave, onCancel }) => {
    const [editForm, setEditForm] = useState({
        id: product.id,
        name: product.name || '',
        new_price: product.new_price || 0,
        description: product.description || '',
    });

    useEffect(() => {
        setEditForm({
            id: product.id,
            name: product.name || '',
            new_price: product.new_price || 0,
            description: product.description || '',
        });
    }, [product]);

    const handleSaveProduct = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3001/products/${editForm.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editForm),
            });

            if (!response.ok) {
                throw new Error('Wystąpił błąd podczas aktualizacji produktu.');
            }

            const updatedProduct = await response.json();
            onSave(updatedProduct);

            toast.success('Produkt został zaktualizowany!', {
                position: 'top-right',
                autoClose: 5000,
            });
        } catch (error) {
            toast.error(error.message || 'Nie udało się zaktualizować produktu.', {
                position: 'top-right',
                autoClose: 5000,
            });
        }
    };

    return (
        <table className="edit-product-form">
            <tbody>
                <tr>
                    <td>
                        <label>
                            Nazwa:
                            <input 
                                className='input-text'
                                type="text"
                                value={editForm.name || ''}
                                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                            />
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>
                            Nowa Cena:
                            <input
                                type="number"
                                value={editForm.new_price || ''}
                                onChange={(e) => setEditForm({ ...editForm, new_price: e.target.value })}
                            />
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>
                            Opis:
                            <textarea
                                value={editForm.description || ''}
                                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                            />
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <button type="submit" className="button-save">Zapisz</button>
                        <button type="button" className="button-cancel" onClick={onCancel}>Anuluj</button>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default EditProduct;
