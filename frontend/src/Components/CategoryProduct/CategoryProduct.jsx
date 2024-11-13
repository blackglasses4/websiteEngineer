import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CategoryProducts = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/products');
        const data = await response.json();

        const filteredProducts = data.filter(product => product.category === category);
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <section className='popularProduct'>
        {category === "men" && <h1>Produkty dla Mężczyzn</h1>}
        {category === "women" && <h1>Produkty dla Kobiet</h1>}
        {category === "equipment" && <h1>Sprzęt</h1>}
        
        <div className="popular-item">
        {products.map(item => (
          <div className="item" key={item.id}>
            <img src={item.image} alt={item.name} />
            <p>{item.name}</p>
            <div className="item-prices">
              <div className="item-prices-new">{item.new_price}zł</div>
              <div className="item-prices-old">{item.old_price}zł</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryProducts;
