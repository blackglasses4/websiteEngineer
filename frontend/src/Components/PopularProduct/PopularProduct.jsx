import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './PopularProduct.scss';

const PopularProduct = () => {
  const [dataProduct, setDataProduct] = useState([]);
  const [error, setError] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const maxProduct = 4;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/products');

        const data = await response.json();
        const popularProducts = data.filter(product => product.popular === "true");

        setDataProduct(popularProducts);
        setIsFetched(true);

      } catch (error) {
        console.error("Błąd podczas pobierania danych:", error);
        setError(true);
      }
    };

    if (!isFetched) {
      fetchProducts();
    }
  }, [isFetched]);

  const totalPages = Math.ceil(dataProduct.length / maxProduct);
  const currentProducts = dataProduct.slice(
    (currentPage - 1) * maxProduct,
    currentPage * maxProduct
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };


  if (error) {
    return (
      <section className='popularProduct'>
        <h1>Popular Product</h1>
        <div className="error-products">
          <p>Błąd podczas pobierania produktów. Przepraszamy za utrudnienia</p>
        </div>
      </section>
    );
  }

  return (
    <section className='popularProduct'>
      <h1>Popular Product</h1>

      <div className="numberOfPages">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}>Wstecz</button>
        <span>Strona {currentPage} z {totalPages}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}>Następne</button>
      </div>

      <div className="popular-item">
        {currentProducts.map(item => (
          <div className="item" key={item.id}>
            <Link to={`/product/${item.id}`}>
              <img src={item.image} alt={item.name} />
              <p>{item.name}</p>
              <div className="item-prices">
                <div className="item-prices-new">{item.new_price}zł</div>
                <div className="item-prices-old">{item.old_price}zł</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularProduct;
