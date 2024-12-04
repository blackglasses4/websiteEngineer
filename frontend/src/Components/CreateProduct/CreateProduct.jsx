import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './CreateProduct.scss';

const CreateProduct = () => {
    const initialProductState = {
        id: '',
        category: '',
        name: '',
        image: null,
        popular: false,
        new_price: '',
        old_price: '',
        description: '',
        sizes: []
    };

    const [product, setProduct] = useState(initialProductState);
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [products, setProducts] = useState([]);

    // Ładowanie produktów z serwera, aby uzyskać ostatnie id
    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('http://localhost:3001/products');
            const data = await response.json();
            setProducts(data);
        };

        fetchProducts();
    }, []);

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
                sizes: checked ? [...prev.sizes, size] : prev.sizes.filter((s) => s !== size),
            }));
        }
        else if (type === 'file') {
            const file = e.target.files[0];
            setProduct((prev) => ({
                ...prev,
                image: file,
            }));
            setImagePreview(URL.createObjectURL(file));
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
            const newId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;

            const productData = {
                id: newId,
                name: product.name,
                category: product.category,
                image: product.image ? product.image.name : null, 
                popular: product.popular,
                new_price: product.new_price,
                old_price: product.old_price,
                description: product.description,
                sizes: product.sizes,
            };

            const response = await fetch('http://localhost:3001/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });

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
            setProducts((prev) => [...prev, productData]);
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

    return (
        <div className="create-product">
            <h1>Dodaj nowy Product</h1>
            <div className='form-container expand'>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="nazwa">Nazwa: <input type="text" name="name" id="name" maxLength="30" value={product.name} onChange={handleInputChange} required/></label>
                    <label htmlFor="category">Kategoria: 
                        <select name="category" id="category" value={product.category} onChange={handleInputChange} required>
                            <option value="">Wybierz kategorię</option>
                            <option value="women">Kobieta</option>
                            <option value="men">Mężczyzna</option>
                            <option value="equipment">Sprzęt</option>
                        </select>
                    </label>

                    <label htmlFor="image">Obraz: 
                        <input type="file" name="image" accept='image/*' id="image" onChange={handleInputChange} required/>
                        {imagePreview && <img className='add-img' src={imagePreview} alt="preview" />}
                    </label>
                    <label htmlFor="popular">Czy jest popularny: <input type="checkbox" name="popular" id="popular" onChange={handleInputChange} checked={product.popular}/></label>
                    <label htmlFor="new_price">Nowa cena: <input type="number" name="new_price" id="new_price" min="0" step="0.01" value={product.new_price} onChange={handleInputChange} required/></label>
                    <label htmlFor="old_price">Stara cena: <input type="number" name="old_price" id="old_price" min="0" step="0.01" value={product.old_price} onChange={handleInputChange} /></label>
                    <label htmlFor="description">Opis: <textarea name="description" id="description" maxLength="80" value={product.description} onChange={handleInputChange} required></textarea></label>
                    <fieldset>
                        <legend>Rozmiary:</legend>
                        {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                            <label htmlFor="sizes" key={size}>{size}
                                <input type="checkbox" name="size" id="size" value={size} checked={product.sizes.includes(size)} onChange={handleInputChange}/>
                            </label>
                        ))}
                    </fieldset>

                    <button type="submit" disabled={loading}>{loading ? 'Dodawanie...' : 'Dodaj produkt'}</button>
                </form>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default CreateProduct;
