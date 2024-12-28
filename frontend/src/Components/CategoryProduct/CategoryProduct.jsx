import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import ProductFilter from '../ProductFilter/ProductFilter';
import './CategoryProduct.scss';
import {BACKEND_URL} from '../config';

const CategoryProducts = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const maxProduct = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/products`);
        const data = await response.json();

        const filteredProducts = data.data.filter(product => product.category === category);

        setProducts(filteredProducts);
        setFilteredProducts(filteredProducts); 
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(true);
      }
    };

    fetchProducts();
  }, [category]);

  const handleFilterChange = ({ gender, sortOrder }) => {
    let updatedProducts = [...products];

    if (gender !== "all") {
      updatedProducts = updatedProducts.filter(
        (product) => product.gender === gender
      );
    }

    if (sortOrder === "asc") {
      updatedProducts.sort((a, b) => a.new_price - b.new_price);
    } else if (sortOrder === "desc") {
      updatedProducts.sort((a, b) => b.new_price - a.new_price);
    }

    setFilteredProducts(updatedProducts);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredProducts.length / maxProduct);
  const currentProducts = filteredProducts.slice(
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
        {category === "koszulka" && <h1>Koszulki</h1>}
        {category === "kurtka" && <h1>Kurtki</h1>}
        {category === "spodnie" && <h1>Spodnie</h1>}
        {category === "czapka" && <h1>Czapki</h1>}
        {category === "stroje" && <h1>Stroje</h1>}

        <p className="error-products">Błąd podczas pobierania produktów. Przepraszamy za utrudnienia</p>
      </section>
    );
  }

  return (
    <section className="categoryProduct">
      {category === "koszulka" && <h1>Koszulka</h1>}
      {category === "kurtka" && <h1>Kurtki</h1>}
      {category === "spodnie" && <h1>Spodnie</h1>}
      {category === "czapka" && <h1>Czapki</h1>}
      {category === "stroje" && <h1>Stroje</h1>}

      <div className="filter-and-pagination">
        <div className="numberOfPages">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>Wstecz</button>
            <span>Strona {currentPage} z {totalPages}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>Następne</button>
        </div>
        <ProductFilter products={products} onFilterChange={handleFilterChange} />
      </div>

      <div className="category-item">
        {currentProducts.map(item => (
          <div className="item" key={item.id}>
            <Link to={`/product/${item.id}`}>
                {item.image && (
                  <LazyLoadImage
                  src={item.image.url}
                  effect="blur"
                  alt={item.image.alt}
                  width="100%"
                  height="auto"
                  threshold={100}
                />
              )}
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
