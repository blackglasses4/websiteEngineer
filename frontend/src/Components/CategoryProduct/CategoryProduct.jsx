import React, { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { getProducts } from '../../backend';
import { FaSlidersH } from 'react-icons/fa';
import { BACKEND_URL } from '../../config';

import useClick from '../useClick';

import './CategoryProduct.scss';
import '../Filter/Filter.scss';

const CategoryProducts = () => {
  const { category } = useParams();
  const [error, setError] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterPanelRef = useRef(null);
  useClick(filterPanelRef, () => setIsFilterOpen(false));
  const [confirmedResults, setConfirmedResults] = useState([]);

  // stronicowanie
  const [page, setPage] = useState(1);
  const [firstPage, setFirstPage] = useState();
  const [prevPage, setPrevPage] = useState();
  const [nextPage, setNextPage] = useState();
  const [lastPage, setLastPage] = useState();

  const [numberOfPages, setNumberOfPages] = useState();
  //filtrowanie
  const [gender, setGender] = useState();

  //sortortowanie
  const [sort, setSort] = useState("none");

  const fetchProducts = async () => {
    try {
      const params = {
        'page': page,
        'per_page': 8,
        'category': category
      };
    
      if (gender) {
        params['gender'] = gender;
      }

      if (sort && sort !== 'none') {
          params['sort'] = sort;
      }

      const response = await getProducts(params);
      const result = await response.json();

      if (result['data']) {
        setFirstPage(result['first']);
        setPrevPage(result['prev']);
        setNextPage(result['next']);
        setLastPage(result['last']);
        setNumberOfPages(result['pages']);
        setConfirmedResults(result['data']);
      } else {
        console.error('Brak danych w odpowiedzi');
      }
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
  }, [category, page, gender, sort]);

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

      <div className="filter">
        <div className="filter-category">
          <input type="button" value="&lt;&lt;" disabled={page === 1} onClick={() => {setPage(firstPage)}}></input>
          <input type="button" value="&lt;" disabled={prevPage === null} onClick={() => { if (prevPage) setPage(prevPage);}}></input>
          <span>{page} z {numberOfPages}</span>
          <input type="button" value="&gt;" disabled={nextPage === null} onClick={() => { if (nextPage) setPage(nextPage);}}></input>
          <input type="button" value="&gt;&gt;" disabled={page === numberOfPages} onClick={() => {setPage(lastPage)}}></input>
        </div>
        <div className="product-filter">
            <button className="filter-toggle" onClick={() => setIsFilterOpen(!isFilterOpen)}>
                <FaSlidersH />Wszystkie filtr
            </button>

            {isFilterOpen && (
                <div className="filter-panel" ref={filterPanelRef}>
                    <div className="filter-group">
                        <label>Filtruj według płci:</label>
                        <select
                            id="gender-filter"
                            value={gender || 'all'}
                            onChange={(e) => {
                                const selectedGender = e.target.value === 'all' ? null : e.target.value;
                                setGender(selectedGender);
                                setPage(1);
                            }}>
                            <option value="all">Wszystko</option>
                            <option value="woman">Kobiety</option>
                            <option value="man">Mężczyźni</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label htmlFor="sort-filter">Sortuj według ceny:</label>
                        <select
                            id="sort-filter"
                            value={sort || 'none'}
                            onChange={(e) => {
                                const selectedSort = e.target.value === 'none' ? null : e.target.value;
                                setSort(selectedSort === 'none' ? null : selectedSort);
                                setPage(1);
                            }}>
                            <option value="none">Brak sortowania</option>
                            <option value="new_price">Od najniższej do najwyższej</option>
                            <option value="-new_price">Od najwyższej do najniższej</option>
                        </select>
                    </div>
                </div>
            )}
        </div>
    </div>

      <div className="category-item">
        {confirmedResults.map(item => (
          <div className="item" key={item.id}>
            <Link to={`/product/${item.id}`}>
                {item.picture && (
                  <LazyLoadImage
                  src={`${BACKEND_URL}${item.picture}`}
                  effect="blur"
                  alt='vvvv'
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
