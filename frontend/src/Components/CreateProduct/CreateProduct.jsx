import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getProducts, addProduct } from '../../backend';

import './Create.scss';
import { BACKEND_URL } from '../../config';

const CreateProduct = () => {
    const initialProductState = {
        category: '',
        gender: '',
        name: '',
        popular: false,
        picture: null,
        new_price: '',
        old_price: '',
        description: '',
        sizes: [],
        color: [],
        material: '',
    };

    const [product, setProduct] = useState(initialProductState);
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const handleInputChange = (e) => {
        const { type, name, value, checked } = e.target;

        if (type === 'checkbox' && name === 'popular') {
            setProduct((prev) => ({
                ...prev,
                [name]: checked
            }));
        }
        else if (type === 'checkbox' && name === 'size') {
            const size = value;
            setProduct((prev) => ({
                ...prev,
                sizes: checked 
                    ? [...prev.sizes, size]
                    : prev.sizes.filter((s) => s !== size),
            }));
        }
        else if (type === 'checkbox' && name === 'color') {
            const color = value;
            setProduct((prev) => ({
                ...prev,
                color: checked
                    ? [...prev.color, color]
                    : prev.color.filter((c) => c !== color),
            }));
        }
        else if (name === 'material') {
            setProduct((prev) => ({
                ...prev,
                material: value,
            }));
        }
        else if (name === 'new_price' || name === 'old_price') {
            setProduct((prev) => ({
                ...prev,
                [name]: parseFloat(value) || 0,
            }));
        }
        else {
            setProduct((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const form = new FormData();
            form.append('file', document.getElementById('fileInput').files[0]);
            
            const result = await fetch(`${BACKEND_URL}/files/`, {
                method:'POST',
                body: form
            });
            const res = await result.json();
            const picture_path = res['filepath'];
            console.log(res);

            const productData = {
                // id: newId,
                name: product.name,
                category: product.category,
                gender: product.gender,
                popular: product.popular,
                new_price: product.new_price,
                old_price: product.old_price,
                description: product.description,
                sizes: product.sizes.join(','),
                colors: product.color.join(','),
                material: product.material,
                picture: picture_path
            };



            const response = await addProduct(productData);

            const data = await response.json();
            console.log(data);

            if (!response.ok) {
                toast.error('Wystąpił błąd podczas dodawania produktu.', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                throw new Error('Wystąpił błąd podczas dodawania produktu.');
            }

            toast.success('Produkt został pomyślnie dodany!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            // Resetowanie formularza
            setProduct(initialProductState);
        }
        catch (err){
            toast.error(err.message || 'Coś poszło nie tak.', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        finally {
            setLoading(false);
        }
    }

    const toggleForm = () => {
        setIsFormOpen(!isFormOpen);
    };

    return (
        <div className="create-product">
            <button className="toggle-form-btn" onClick={toggleForm}>
                {isFormOpen ? 'Zwiń formularz' : 'Rozwiń formularz'}
            </button>

            <div className={`form-container ${isFormOpen ? 'open' : ''}`}>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="nazwa">Nazwa: <input type="text" name="name" id="name" maxLength="30" value={product.name} onChange={handleInputChange} required/></label>
                    <label htmlFor="category">Kategoria: 
                        <select name="category" id="category" value={product.category} onChange={handleInputChange} required>
                                <option value="">Wybierz kategorię</option>
                                <option value="koszulka">Koszulka</option>
                                <option value="kurtka">Kurtka</option>
                                <option value="spodnie">Spodnie</option>
                                <option value="czapka">Czapka</option>
                                <option value="stroje">Stroje</option>
                        </select>
                    </label>
``
                    <label htmlFor="gender">Płeć: 
                        <select name="gender" id="gender" value={product.gender} onChange={handleInputChange} required>
                        <option value="">Wybierz płeć</option>
                                <option value="kobiety">Kobieta</option>
                                <option value="mężczyźni">Mężczyzna</option>
                                <option value="dla obu płci">Dla obu płci</option>
                        </select>
                    </label>

                    <label htmlFor="image">Obraz: 
                        <input type="file" name="image" accept='image/*' id="fileInput" required/>
                        {imagePreview && <img className='add-img' src={imagePreview} alt="preview" />}
                    </label>
                    <label htmlFor="popular">Czy jest popularny: <input type="checkbox" name="popular" id="popular" onChange={handleInputChange} checked={product.popular}/></label>
                    <label htmlFor="new_price">Nowa cena: <input type="number" name="new_price" id="new_price" min="0" step="0.01" value={product.new_price} onChange={handleInputChange} required/></label>
                    <label htmlFor="old_price">Stara cena: <input type="number" name="old_price" id="old_price" min="0" step="0.01" value={product.old_price} onChange={handleInputChange} /></label>
                    <label htmlFor="description">Opis: <textarea name="description" id="description" maxLength="80" value={product.description} onChange={handleInputChange} required></textarea></label>
                    <fieldset>
                        <legend>Rozmiary:</legend>
                        {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                            <label htmlFor="size" key={size}>{size}
                                <input
                                    type="checkbox"
                                    name="size"
                                    id="size"
                                    value={size}
                                    checked={product.sizes.includes(size)}
                                    onChange={handleInputChange}/>
                            </label>
                        ))}
                    </fieldset>
                    <fieldset>
                        <legend>Kolory:</legend>
                        {['white', 'black', 'lime', 'grey', 'red', 'green', 'blue', 'pink',
                        'navy', 'purple', 'yellow', 'turquoise', 'darkgreen', 'darkcyan'].map((color) => (
                            <label htmlFor="color" key={color}>{color}
                                <input 
                                    type="checkbox"
                                    name="color"
                                    id="color"
                                    value={color}
                                    checked={product.color.includes(color)}
                                    disabled={!product.color.includes(color) && product.color.length >= 5}
                                    onChange={handleInputChange}/>
                            </label>
                        ))}
                    </fieldset>

                    <label htmlFor="material">Materiały: 
                        <select name="material" id="material" value={product.material} onChange={handleInputChange} required>
                                <option value="">Wybierz materiał</option>
                                <option value="poliester">Poliester</option>
                                <option value="bawełna">Bawełna</option>
                                <option value="elastan">Elastan</option>
                                <option value="spandex">Spandex</option>
                                <option value="nylon">Nylon</option>
                                <option value="poliamid">Poliamid</option>
                                <option value="polar">Polar</option>
                                <option value="puch">Puch</option>
                        </select>
                    </label>

                    <button type="submit" disabled={loading}>{loading ? 'Dodawanie...' : 'Dodaj produkt'}</button>
                </form>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default CreateProduct;
