import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { FaSlidersH } from 'react-icons/fa';
import { BACKEND_URL } from '../../config';

import CreateProduct from '../CreateProduct/CreateProduct';
import SearchBar from './SearchBar';
import EditProduct from './EditProduct';
import useClick from '../useClick';
import { getProducts, deleteProduct } from '../../backend';

import '../Filter/Filter.scss';
import './Search.scss';

const SearchProduct = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const filterPanelRef = useRef(null);
    useClick(filterPanelRef, () => setIsFilterOpen(false));

    const [products, setProducts] = useState([]);
    const [confirmedResults, setConfirmedResults] = useState([]);
    const [productToEdit, setProductToEdit] = useState(null);

    // stronicowanie
    const [page, setPage] = useState(1);
    const [firstPage, setFirstPage] = useState();
    const [prevPage, setPrevPage] = useState();
    const [nextPage, setNextPage] = useState();
    const [lastPage, setLastPage] = useState();

    const [numberOfPages, setNumberOfPages] = useState();
    const [numberOfItems, setNumberOfItems] = useState();

    //filtrowanie
    const [gender, setGender] = useState();
    //sortortowanie
    const [sort, setSort] = useState("none");

    const fetchProducts = async () => {
        try {
            const params = {
                'page': page,
                'per_page': 8
            };
            
            if (gender) {
                params['gender'] = gender;
            }
    
            if (sort && sort !== 'none') {
                params['_sort'] = sort;
            }
    
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
        }
    };    
    
    useEffect(() => {
        fetchProducts();
    }, [page, gender, sort]);

    const handleConfirmDelete = (id) => {
        if(!id) {
            console.error('Id jest undefined');
            return;
        }
        
        const toastId = toast.info((
            <div>
                <p>Czy na pewno chcesz usunąć ten produkt?</p>
                <div className='toast-div'>
                    <button onClick={() => handleDeleteProdukt(id, toastId)}>Usuń</button>
                    <button onClick={() => toast.dismiss(toastId)}>Anuluj</button>
                </div>
            </div>
        ), {
            className: "custom-toast",
            autoClose: false,
        });
              
    };    

    const handleDeleteProdukt = async (id, toastId) => {
        if (!id) {
            console.error('Id jest undefined');
            return;
        }

        try {

            const response = await deleteProduct(id);
            // const response = await fetch(`${BACKEND_URL}/products/${id}`, {
            //     method: 'DELETE',
            // });
    
            if (!response.ok) {
                throw new Error('Wystąpił błąd podczas usuwania produktu.');
            }
    
            setProducts((prev) => prev.filter((product) => product.id !== id));

            setTimeout(() => {
                fetchProducts();
            }, 2000);

            toast.success('Produkt został usunięty!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            if (toastId) {
                toast.dismiss(toastId);
            } else {
                console.error('toastId is undefined');
            }
    
        } catch (err) {
            toast.error(err.message || 'Nie udało się usunąć produktu.', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });  
            if (toastId) {
                toast.dismiss(toastId);
            }
        } finally {
            if (toastId) {
                toast.dismiss(toastId);
            }    
        }
    };

    const handleSaveProduct = (updatedProduct) => {
        setProducts((prevProducts) => prevProducts.map((product) => 
            product.id === updatedProduct.id ? updatedProduct : product
        ));
    
        setConfirmedResults((prevConfirmedResults) => prevConfirmedResults.map((product) => 
            product.id === updatedProduct.id ? updatedProduct : product
        ));
    
        setProductToEdit(null); // Zamykamy tryb edycji po zapisaniu zmian
    
        toast.success('Produkt został zaktualizowany!', {
            position: 'top-right',
            autoClose: 5000,
        });
    };    

    const handleCancelEdit = () => {
        setProductToEdit(null);
    };

    return (
        <div className="search-product">
            <h1 className='admin-h1'>Dodaj nowy produkt</h1>
            <CreateProduct/>
            <h1 className='admin-h1'>Wyszukaj produkty</h1>

            <SearchBar data={products} setConfirmedResults={setConfirmedResults} type="products" />
            
            <section className="admin-search_products">
                <div className="filter">
                    <button className='button-reset' onClick={() => setConfirmedResults([])}>Resetuj</button>
                    <input type="button" value="&lt;&lt;" disabled={page === 1} onClick={() => {setPage(firstPage)}}></input>
                    <input type="button" value="&lt;" disabled={prevPage === null} onClick={() => { if (prevPage) setPage(prevPage);}}></input>
                    <span>{page} z {numberOfPages}</span>
                    <input type="button" value="&gt;" disabled={nextPage === null} onClick={() => { if (nextPage) setPage(nextPage);}}></input>
                    <input type="button" value="&gt;&gt;" disabled={page === numberOfPages} onClick={() => {setPage(lastPage)}}></input>
                    <span>Liczba sztuk: {numberOfItems}</span>

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
            {confirmedResults.length === 0 ? (
                    <p className='search-empty'>Brak wyników do wyświetlenia. Spróbuj wyszukać produkt powyżej.</p>
                ) : (
                    <table className="admin-search_table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Zdjęcie</th>
                                <th>Kategoria</th>
                                <th>Płeć</th>
                                <th>Nazwa</th>
                                <th>Popularne</th>
                                <th>Nowa cena</th>
                                <th>Stara cena</th>
                                <th>Opis</th>
                                <th>Rozmiary</th>
                                <th>Kolory</th>
                                <th>Materiał</th>
                                <th>Edytuj</th>
                                <th>Usuń</th>
                            </tr>
                        </thead>
                        <tbody>
                            {confirmedResults.map((product) => (
                                <React.Fragment key={product.id}>
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>
                                        {product.picture && (
                                            <LazyLoadImage
                                            src={`${BACKEND_URL}${product.picture}`}
                                            alt='Zdjęcie produktu'
                                            effect="blur"
                                            className="cart-item-image"/>
                                        )}
                                    </td>
                                    <td>{product.category || 'Brak'}</td>
                                    <td>{product.gender}</td>
                                    <td>{product.name.length > 20 ? `${product.name.slice(0,20)}...` : product.name}</td>
                                    <td>{product.popular === true ? 'Tak' : 'Nie'}</td>
                                    <td>{product.new_price} zł</td>
                                    <td>{product.old_price ? `${product.old_price} zł` : '—'}</td>
                                    <td>{product.description ? product.description.slice(0,25) + '...' : 'Brak opisu'}</td>
                                    <td>{product.size || "Brak"}</td>
                                    <td>{product.color || "Brak"}</td>
                                    <td>{product.material || 'Brak'}</td>

                                    <td><button className='button-edit' onClick={() => setProductToEdit(product)}>Edytuj</button></td>
                                    <td><button className='button-delete' onClick={() => handleConfirmDelete(product.id)}>Usuń</button></td>
                                </tr>
                                {productToEdit && productToEdit.id === product.id && (
                                    <tr className="edit-product open">
                                        <td colSpan="11">
                                                <EditProduct
                                                    product={productToEdit}
                                                    onSave={handleSaveProduct}
                                                    onCancel={handleCancelEdit}
                                                />
                                        </td>
                                    </tr>
                                )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                )}
            </section>

            <section className="admin-search_products-mobile">
                <button className='button-reset' onClick={() => setConfirmedResults([])}>Resetuj</button>
                {confirmedResults.length === 0 ? (
                    <p className='search-empty'>Brak wyników do wyświetlenia. Spróbuj wyszukać produkt powyżej.</p>
                ) : (
                    <div className="search-mobile">
                        {confirmedResults.map((product) => (
                            <div className="search-mobile_product" key={product.id}>
                                {product.image && (
                                        <LazyLoadImage
                                        src={product.image.url}
                                        alt={product.image.alt || 'Zdjęcie produktu'}
                                        effect="blur"
                                        className="product-image"/>
                                    )}
                                <div className="product-details">
                                    <p><span>ID: </span>{product.id}</p>
                                    <p><span>Kategoria: </span>{product.category}</p>
                                    <p><span>Płeć: </span>{product.gender}</p>
                                    <p><span>Nazwa: </span>{product.name.length > 20 ? `${product.name.slice(0, 20)}...` : product.name}</p>
                                    <p><span>Popularne: </span>{product.popular ? 'Tak' : 'Nie'}</p>
                                    <p><span>Nowa cena: </span>{product.new_price} zł</p>
                                    <p><span>Stara cena: </span>{product.old_price ? `${product.old_price} zł` : '—'}</p>
                                    <p><span>Opis: </span>{product.description ? product.description.slice(0, 20) + '...' : 'Brak opisu'}</p>
                                    <p><span>Rozmiary: </span>{product.size || 'Brak'}</p>
                                    <p><span>Kolory: </span>{product.color || 'Brak'}</p>
                                    <p><span>Materiał: </span>{product.material || 'Brak'}</p> 

                                    <div className="mobile-button">
                                        <button className='button-edit' onClick={() => setProductToEdit(product)}>Edytuj</button>
                                        <button className='button-delete' onClick={() => handleConfirmDelete(product.id)}>Usuń</button>
                                    </div>
                                </div>
                                {productToEdit && productToEdit.id === product.id && (
                                    <div className="edit-product-mobile open">
                                        <EditProduct
                                            product={productToEdit}
                                            onSave={handleSaveProduct}
                                            onCancel={handleCancelEdit}
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default SearchProduct;