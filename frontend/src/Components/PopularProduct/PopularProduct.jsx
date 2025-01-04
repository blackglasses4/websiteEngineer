import React, { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { getProducts } from '../../backend';
import { BACKEND_URL } from '../../config';

import './PopularProduct.scss';
import '../Filter/Filter.scss';

const PopularProduct = () => {
    const [error, setError] = useState(false);

    const [products, setProducts] = useState([]);
    const [confirmedResults, setConfirmedResults] = useState([]);

    // stronicowanie
    const [page, setPage] = useState(1);
    const [firstPage, setFirstPage] = useState();
    const [prevPage, setPrevPage] = useState();
    const [nextPage, setNextPage] = useState();
    const [lastPage, setLastPage] = useState();

    const [numberOfPages, setNumberOfPages] = useState();
    const [numberOfItems, setNumberOfItems] = useState();

    //filtrowanie
    const [popular, setPopular] = useState();

    const fetchProducts = async () => {
      try {
        const params = {
          'page': page,
          'per_page': 8,
          'popular': true
        };

        const response = await getProducts(params);
        const result = await response.json();

        if (result['data']) {
          setFirstPage(result['first']);
          setPrevPage(result['prev']);
          setNextPage(result['next']);
          setLastPage(result['last']);
          setNumberOfPages(result['pages']);
          setNumberOfItems(result['items']);

          setProducts(result['data']);
          setConfirmedResults(result['data']);
        } else {
          console.error('Brak danych w odpowiedzi');
        }
        // const popularProducts = data.data.filter(product => product.popular === true);
        // console.log(popularProducts);
        // setDataProduct(popularProducts);
        // setIsFetched(true);

      } catch (error) {
        toast.error('Nie udało się załadować produktów.', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        setError(true);
      }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, popular]);

  if (error) {
    return (
      <section className='popularProduct'>
        <h1>Popularne Produkty</h1>
        <div className="error-products">
          <p>Błąd podczas pobierania produktów. Przepraszamy za utrudnienia</p>
        </div>
      </section>
    );
  }

  return (
    <section className='popularProduct'>
      <h1>Popularne Produkty</h1>

      <div className="filter-popular">
        <div className="filter">
          <input type="button" value="&lt;&lt;" disabled={page === 1} onClick={() => {setPage(firstPage)}}></input>
          <input type="button" value="&lt;" disabled={prevPage === null} onClick={() => { if (prevPage) setPage(prevPage);}}></input>
          <span>{page} z {numberOfPages}</span>
          <input type="button" value="&gt;" disabled={nextPage === null} onClick={() => { if (nextPage) setPage(nextPage);}}></input>
          <input type="button" value="&gt;&gt;" disabled={page === numberOfPages} onClick={() => {setPage(lastPage)}}></input>
        </div>
      </div>

      <div className="popular-item">
        {confirmedResults.map(item => (
          <div className="item" key={item.id}>
            <Link to={`/product/${item.id}`}>
              {item.picture && (
                <LazyLoadImage
                  src={`${BACKEND_URL}${item.picture}`}
                  effect="blur"
                  alt="fff"
                  width="100%"
                  height="auto"
                  threshold={100}/>
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

export default PopularProduct;
