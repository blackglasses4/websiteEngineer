import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../Cart/CartContext';
import { toast } from 'react-toastify';
import './DisplayProduct.scss';

const DisplayProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:3001/products/${id}`);
                if (!response.ok) throw new Error("Błąd podczas pobierania danych");
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error("Błąd", error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (error) return <p className="error-product">Nie udało się załadować danych o produkcie</p>;
    if (loading) return <p className='loading-product'>Ładowanie produktu...</p>;
    if (!product) return <p className="error-product">Produkt nie został odnaleziony</p>;

    const handleAddToCart = () => {
        addToCart(product.id);
        toast.success('Dodano produkt do koszyka!', {
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
                    <img src={product.image} alt={product.name} />
                    <div className="additional-images">
                        <img src={product.image} alt={`${product.name} dodatkowe zdjęcie 1`}/>
                        <img src={product.image} alt={`${product.name} dodatkowe zdjęcie 2`}/>
                    </div>
                </div>
                <div className="product-display__details">
                    <p className='description'>{product.description}</p>
                    <p>Cena: {product.new_price} zł {product.old_price && <span>{product.old_price} zł</span>}
                    </p>
                    <div className="product-display__sizes">
                        <h3>Wybierz rozmiar</h3>
                        <ul>
                            {product.sizes && product.sizes.length > 0 ? (
                                product.sizes.map((size, id) => <li key={id}>{size}</li>)
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
