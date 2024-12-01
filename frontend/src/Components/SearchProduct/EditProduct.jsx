import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './EditProduct.scss';

const EditProduct = ({ product, onSave, onCancel }) => {
    const [editForm, setEditForm] = useState({
        id: product.id,
        category: product.category || '',
        name: product.name || '',
        image: product.image || '',
        popular: product.popular || false,
        new_price: product.new_price || 0,
        old_price: product.old_price || 0,
        description: product.description || '',
        sizes: product.sizes || [],
    });

    useEffect(() => {
        setEditForm({
            id: product.id,
            category: product.category || '',
            name: product.name || '',
            image: product.image || '',
            popular: product.popular || false,
            new_price: product.new_price || 0,
            old_price: product.old_price || 0,
            description: product.description || '',
            sizes: product.sizes || [],
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
        } catch (error) {
            toast.error(error.message || 'Nie udało się zaktualizować produktu.', {
                position: 'top-right',
                autoClose: 5000,
            });
        }
    };

    const handleSizeChange = (size) => {
        setEditForm((prevForm) => {
            const sizes = prevForm.sizes.includes(size)
                ? prevForm.sizes.filter((s) => s !== size)
                : [...prevForm.sizes, size];

            return {
                ...prevForm,
                sizes,
            };
        });
    };

    const handlePopularChange = () => {
        console.log("Popular przed zmianą:", editForm.popular); // Debugowanie
        setEditForm((prevForm) => {
            const updatedPopular = !prevForm.popular;
            console.log("Popular po zmianie:", updatedPopular); // Debugowanie
            return {
                ...prevForm,
                popular: updatedPopular, // Zmieniamy tylko pole popular
            };
        });
    };

    return (
        <table className="edit-product-form">
            <tbody>
                <tr>
                    <td>
                        <label>
                            Kategoria:
                            <select
                                id="input-text"
                                value={editForm.category || ''}
                                onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}>
                                <option value="">Wybierz kategorię</option>
                                <option value="women">Kobieta</option>
                                <option value="men">Mężczyzna</option>
                                <option value="equipment">Sprzęt</option>
                            </select>
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>
                            Nazwa:
                            <input
                                id="input-text"
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
                            Zdjęcie:
                            <input
                                id="input-text"
                                type="file"
                                accept="image/*"
                                onChange={(e) => setEditForm({ ...editForm, image: e.target.files[0] })}
                            />
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>
                            Popularny:
                            <input
                                id="input-popular"
                                type="checkbox"
                                checked={editForm.popular} // Zmieniamy na checked
                                onChange={handlePopularChange} // Toggle popularności
                            />
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>
                            Nowa cena:
                            <input
                                id="input-text"
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
                            Stara cena:
                            <input
                                id="input-text"
                                type="number"
                                value={editForm.old_price || ''}
                                onChange={(e) => setEditForm({ ...editForm, old_price: e.target.value })}
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
                        <fieldset id="input-size">
                            <legend>Rozmiary:</legend>
                            {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                                <label key={size}>
                                    {size}
                                    <input
                                        id="input-size"
                                        type="checkbox"
                                        value={size}
                                        checked={editForm.sizes.includes(size)} // Zmieniamy na checked
                                        onChange={() => handleSizeChange(size)}
                                    />
                                </label>
                            ))}
                        </fieldset>
                    </td>
                </tr>
                <tr>
                    <td>
                        <button type="button" className="button-save" onClick={handleSaveProduct}>Zapisz</button>
                        <button type="button" className="button-cancel" onClick={onCancel}>Anuluj</button>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default EditProduct;
