import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './SimilarProduct.scss';
import { BACKEND_URL } from '../../../config';

const SimilarProducts = ({ products, category, selectedProductId }) => {
  const similarProducts = products
    .filter((product) => product.category === category && product.id !== selectedProductId);

  const [currentSlide, setCurrentSlide] = useState(0);

  const itemsPerSlide = 2;
  const totalSlides = Math.ceil(similarProducts.length / itemsPerSlide);

  const handleNext = () => {
    if (currentSlide < totalSlides - 1) setCurrentSlide((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentSlide > 0) setCurrentSlide((prev) => prev - 1);
  };

  return (
    <section className="similar-products">
      <h1>Podobne produkty</h1>
      <div className="similar-products__carousel">
        <button
          className={`arrow left ${currentSlide === 0 ? 'disabled' : ''}`}
          onClick={handlePrev}
        >
          &#8592;
        </button>
        <div className="similar-products__list">
          <div
            className="similar-products__track"
            style={{
              transform: `translateX(-${currentSlide * (100 / itemsPerSlide)}%)`,
            }}
          >
            {similarProducts.map((item) => (
              <div className="similar-products__item" key={item.id}>
                <Link to={`/product/${item.id}`}>
                  <LazyLoadImage
                    src={BACKEND_URL + item.picture}
                    alt="Zdjęcie podobnego produktu do wybranego"
                    effect="blur"
                    className="similar-products__image"
                  />
                  <p className="similar-products__name">{item.name}</p>
                  <div className="similar-products__prices">
                    <span className="new-price">{item.new_price} zł</span>
                    {item.old_price && (
                      <span className="old-price">{item.old_price} zł</span>
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <button
          className={`arrow right ${
            currentSlide === totalSlides - 1 ? 'disabled' : ''
          }`}
          onClick={handleNext}
        >
          &#8594;
        </button>
      </div>
      <div className="similar-products__dots">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <div
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default SimilarProducts;
