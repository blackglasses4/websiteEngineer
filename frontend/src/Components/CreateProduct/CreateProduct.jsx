import React, { useState, useEffect, useRef } from 'react';
import './CreateProduct.scss';

const CreateProduct = () => {
    const [expanded, setExpanded] = useState(false);
    const [product, setProduct] = useState({
        id: '',
        category: '',
        name: '',
        image: null,
        popular: false,
        new_price: '',
        old_price: '',
        description: '',
        sizes: []
    })

    const formExpansion = () => {
        setExpanded(!expanded);
    };

    const handleInputChange = (e) => {
        const { type, name, value, checked } = e.target;

        if(type === 'checkbox' && name === 'popular') { //dla popular aby działał
            setProduct((prev) => ({
                ...prev, //destrukturyzacja pozwala zachować poprzedni stan obiektu product i aktualizować tylko jedną właściwość (np. name, sizes, popular).
                [name]: checked
            }));
        }
        else if (type === 'checkbox' && name === 'size') {
            const size = value;
            setProduct((prev) => ({
                ...prev,
                sizes: checked ? [...prev.sizes, size] : prev.sizes.filter((s) => s !== size), //... to spread operator, rozpraszanie, tworzenie kopii tabeli
            }));
        }
        else {
            setProduct((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };


  return (
    <div className="create-product">
        <h1>Dodaj nowy Product</h1>
        <button className="expanded-button" onClick={formExpansion}>{expanded ? 'Zwiń formularz' : 'Rozwiń formularz'}</button>
        <div className={`form-container ${expanded ? 'expand' : ''}`}>
            <form action="">
                <label htmlFor="nazwa">Nazwa: <input type="text" name="name" id="name" maxLength="30" value={product.name} onChange={handleInputChange} required/></label>
                <label htmlFor="category">Kategoria: <input type="text" name="category" id="category" value={product.category} onChange={handleInputChange} required/></label>
                <label htmlFor="image">Obraz: <input type="file" name="image" accept='image/*' id="image" onChange={handleInputChange} required/></label>
                <label htmlFor="popular">Czy jest popularny: <input type="checkbox" name="popular" id="popular" onChange={handleInputChange} checked={product.popular} required/></label>
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

                <button type="submit">Dodaj product</button>
            </form>
        </div>
    </div>
  )
}

export default CreateProduct