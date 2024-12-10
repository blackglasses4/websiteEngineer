import React from 'react';
import './LikeProductModal.scss';

const LikeProductModal = ({ likedProducts, onClose, toggleLike, products }) => {
  const likedProductDetails = products.filter(product =>
    likedProducts.includes(product.id)
  );

  return (
    <div className="like-product-modal">
      <div className="modal-header">
        <h3>Polubione Produkty</h3>
        <button onClick={onClose} className="close-button">Zamknij</button>
      </div>
      <div className="modal-content">
        {likedProductDetails.length === 0 ? (
          <p>Brak polubionych produktów</p>
        ) : (
          <ul>
            {likedProductDetails.map((product) => (
              <li key={product.id}>
                <img src={product.imageUrl} alt={product.name} />
                <h4>{product.name}</h4>
                <p>{product.price} PLN</p>
                <button onClick={() => toggleLike(product.id)}>Usuń z polubionych</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default LikeProductModal;
