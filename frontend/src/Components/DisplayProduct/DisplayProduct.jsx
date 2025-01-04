// DisplayProduct.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../Cart/CartContext';
import { toast } from 'react-toastify';
// import { useProducts } from '../ProductContext';
// import SimilarProducts from './SimilarProduct/SimilarProduct';
import './DisplayProduct.scss';
import { getProduct } from '../../backend';
import { BACKEND_URL } from '../../config';

const DisplayProduct = () => {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [product, setProduct] = useState(null);

  const { addToCart } = useCart();

  async function fetchProduct() {
    const response = await getProduct(id);
    const product = await response.json();
    product.sizes = product.sizes ? product.sizes.split(',') : [];
    product.colors = product.colors ? product.colors.split(',') : [];

    setProduct(product);
  }

  useEffect(() => {
    window.scrollTo(0, 0);

    fetchProduct();

}, [id]);

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
      picture: product.picture,
      name: product.name,
      price: product.new_price,
      size: selectedSize,
      color: selectedColor,
      uniqueId: `${product.id}-${selectedSize}-${selectedColor}`,
      quantity: 1,
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
    <>
      <section className="product-display">
        <h1>{product.name}</h1>
        <div className="product-display__content">
          <div className="product-display__image-gallery">
            <img src={BACKEND_URL + product.picture} alt="" />
          </div>
          <div className="product-display__details">
            <p className="description">{product.description}</p>
            <p>
              Cena: {product.new_price} zł{' '}
              {product.old_price && <span>{product.old_price} zł</span>}
            </p>

            <div className="product-display__colors">
              <h3>Wybierz kolor</h3>
              <div className="color-options">
                {product.colors.map((color, index) => (
                  <div
                    key={`${color}-${index}`}
                    className={`color-circle ${
                      selectedColor === color ? 'selected' : ''
                    }`}
                    style={{
                      backgroundColor: color,
                      border: `3px solid ${
                        selectedColor === color ? color : `var(--dominant-light)`
                      }`,
                    }}
                    onClick={() => setSelectedColor(color)}
                  ></div>
                ))}
              </div>
            </div>

            <div className="product-display__sizes">
              <h3>Wybierz rozmiar</h3>
              <ul className="size-options">
                {product.sizes.length > 0 ? (
                  product.sizes.map((size, index) => (
                    <li
                      key={`${size}-${index}`}
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

      {/* <SimilarProducts products={products} category={product.category} selectedProductId={product.id}/> */}
    </>
  );
};

export default DisplayProduct;
