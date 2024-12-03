import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../Cart/CartContext';
import { toast } from 'react-toastify';
import './DisplayProduct.scss';

const DisplayProduct = () => {
    const { id } = useParams();
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                console.log(id);
                const response = await fetch(`http://localhost:3001/products/${id}`);
                if (!response.ok) throw new Error("Błąd podczas pobierania danych");

                const data = await response.json();
                if (!data) throw new Error("Produkt nie został znaleziony");

                setProduct(data);
            } catch (error) {
                console.error("Błąd", error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);  // Efekt uruchamia się przy każdej zmianie id w URL

    if (error) return <p className="error-product">Nie udało się załadować danych o produkcie</p>;
    if (loading) return <p className='loading-product'>Ładowanie produktu...</p>;
    if (!product) return <p className="error-product">Produkt nie został odnaleziony</p>;

    const handleAddToCart = () => {
        if (!selectedSize || !selectedColor) {
            toast.error('Wybierz rozmiar i kolor przed dodaniem do koszyka!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        addToCart({
            productId: product.id,
            image: product.image.url,
            name: product.name,
            price: product.new_price,
            size: selectedSize,
            color: selectedColor,
        });

          toast.success(`Dodano do koszyka: ${product.name}`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    return (
        <section className="product-display">
            <h1>{product.name}</h1>
            <div className="product-display__content">
                <div className="product-display__image-gallery">
                    <img src={product.image.url} alt={product.image.alt} />
                </div>
                <div className="product-display__details">
                    <p className='description'>{product.description}</p>
                    <p>Cena: {product.new_price} zł {product.old_price && <span>{product.old_price} zł</span>}</p>

                    <div className="product-display__colors">
                        <h3>Wybierz kolor</h3>
                        <div className="color-options">
                            {product.attributes.color.map((color) => (
                                <div 
                                    key={color}
                                    className={`color-circle ${selectedColor === color ? 'selected' : ''}`}
                                    style={{backgroundColor: color,
                                            border: `3px solid ${selectedColor === color ? color : `var(--dominant-light)`}`,
                                        }}
                                    onClick={() => setSelectedColor(color)}
                                ></div>
                            ))}
                        </div>
                    </div>

                    <div className="product-display__sizes">
                        <h3>Wybierz rozmiar</h3>
                        <ul className="size-options">
                            {product.attributes.sizes.length > 0 ? (
                                product.attributes.sizes.map((size) => (
                                    <li
                                        key={size}
                                        className={selectedSize === size ? 'selected' : ''}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </li>
                                ))
                            ) : (
                                <p>Nie posiadamy aktualnie żadnych rozmiarów</p>
                            )}
                        </ul>
                    </div>
                    <button onClick={handleAddToCart}>Dodaj do koszyka</button>
                </div>
            </div>
        </section>
    );
};

export default DisplayProduct;
