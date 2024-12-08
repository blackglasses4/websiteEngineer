import React from 'react';
import { Link } from 'react-router-dom';
import './LikeProduct.scss';

const LikeProduct = ({ likedProducts, dataProducts }) => {
  const likedProductDetails = dataProducts.filter(product =>
    likedProducts.includes(product.id)
  );

  return (
    <div className="liked-products">
      {likedProductDetails.length === 0 ? (
        <p>Brak polubionych produktów</p>
      ) : (
        <ul className="liked-products-list">
          {likedProductDetails.map((product) => (
            <li key={product.id} className="liked-product-item">
              <Link to={`/product/${product.id}`} className="liked-product-link">
                <img src={product.imageUrl} alt={product.name} className="liked-product-image" />
                <div className="liked-product-info">
                  <h3>{product.name}</h3>
                  <p>{product.price} zł</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LikeProduct;
