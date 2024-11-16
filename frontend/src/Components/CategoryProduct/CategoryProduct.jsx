import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './CategoryProduct.scss';

const CategoryProducts = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const maxProduct = 4;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/products');
        const data = await response.json();

        const filteredProducts = data.filter(product => product.category === category);
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(true);
      }
    };

    fetchProducts();
  }, [category]);

  const totalPages = Math.ceil(products.length / maxProduct);
  const currentProducts = products.slice(
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
      <section className="categoryProduct">
        {category === "men" && <h1>Produkty dla Mężczyzn</h1>}
        {category === "women" && <h1>Produkty dla Kobiet</h1>}
        {category === "equipment" && <h1>Sprzęt</h1>}

        <p className="error-products">Błąd podczas pobierania produktów. Przepraszamy za utrudnienia</p>
      </section>
    );
  }

  return (
    <section className="categoryProduct">
      {category === "men" && <h1>Produkty dla Mężczyzn</h1>}
      {category === "women" && <h1>Produkty dla Kobiet</h1>}
      {category === "equipment" && <h1>Sprzęt</h1>}

      <div className="numberOfPages">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}>Wstecz</button>
        <span>Strona {currentPage} z {totalPages}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}>Następne</button>
      </div>

      <div className="category-item">
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

export default CategoryProducts;
