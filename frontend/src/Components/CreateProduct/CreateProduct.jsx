import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getProducts, addProduct } from '../../backend';

import './Create.scss';

const CreateProduct = () => {
    const initialProductState = {
        id: '',
        category: '',
        gender: '',
        name: '',
        image: null,
        popular: false,
        new_price: '',
        old_price: '',
        description: '',
        attributes: {
            sizes: [],
            color: [],
            material: '',
        }
    };

    const [product, setProduct] = useState(initialProductState);
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [products, setProducts] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);

    // Ładowanie produktów z serwera, aby uzyskać ostatnie id
    useEffect(() => {
        const fetchProducts = async () => {
            const response = await getProducts();
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
                attributes: {
                    ...prev.attributes,
                    sizes: checked 
                        ? [...prev.attributes.sizes, size]
                        : prev.attributes.sizes.filter((s) => s !== size),
                }
            }));
        }
        else if (type === 'checkbox' && name === 'color'){
            const color = value;
            setProduct((prev) => ({
                ...prev,
                attributes: {
                    ...prev.attributes,
                    color: checked
                        ? [...prev.attributes.color, color]
                        : prev.attributes.color.filter((c) => c !== color),
                },
            }));
        }
        else if (name === 'material') {
            setProduct((prev) => ({
                ...prev,
                attributes: {
                    ...prev.attributes,
                    material: value,
                },
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
                gender: product.gender,
                image: product.image ? product.image.name : null, 
                popular: product.popular,
                new_price: product.new_price,
                old_price: product.old_price,
                description: product.description,
                attributes: {
                    sizes: product.attributes.sizes,
                    color: product.attributes.color,
                    material: product.attributes.material,
                },
            };

            const response = await addProduct(productData);

            // const response = await fetch(`${BACKEND_URL}/products`, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(productData),
            // });

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

                    <label htmlFor="gender">Płeć: 
                        <select name="gender" id="gender" value={product.gender} onChange={handleInputChange} required>
                        <option value="">Wybierz płeć</option>
                                <option value="women">Kobieta</option>
                                <option value="men">Mężczyzna</option>
                                <option value="unisex">Dla obu płci</option>
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
                                <input
                                    type="checkbox"
                                    name="size"
                                    id="size"
                                    value={size}
                                    checked={product.attributes.sizes.includes(size)}
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
                                    checked={product.attributes.color.includes(color)}
                                    disabled={!product.attributes.color.includes(color) && product.attributes.color.length >= 5}
                                    onChange={handleInputChange}/>
                            </label>
                        ))}
                    </fieldset>

                    <label htmlFor="material">Materiały: 
                        <select name="material" id="material" value={product.attributes.material} onChange={handleInputChange} required>
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
