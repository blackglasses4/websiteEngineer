import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUsers, deleteUser} from '../../backend';
import useClick from '../useClick';


import CreateUser from '../CreateUser/CreateUser';
import SearchBar from '../SearchProduct/SearchBar';
import EditUser from './EditUser';

import '../Filter/Filter.scss';
import '../SearchProduct/Search.scss';

const SearchUser = () => {
    const searchUserItemRef = useRef(null);

    const scrollToTop = () => {
      if (searchUserItemRef.current) {
        searchUserItemRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const filterPanelRef = useRef(null);
    useClick(filterPanelRef, () => setIsFilterOpen(false));

    const [users, setUsers] = useState([]);
    const [confirmedResults, setConfirmedResults] = useState([]);
    const [userToEdit, setUserToEdit] = useState(null);

    // stronicowanie
    const [page, setPage] = useState(1);
    const [firstPage, setFirstPage] = useState();
    const [prevPage, setPrevPage] = useState();
    const [nextPage, setNextPage] = useState();
    const [lastPage, setLastPage] = useState();

    const [numberOfPages, setNumberOfPages] = useState();
    const [numberOfItems, setNumberOfItems] = useState();

    //sortortowanie
    const [role, setRole] = useState();

    const fetchUsers = async () => {
        try {
            const params = {
                'page': page,
                'per_page': 8
            }
            
            if (role) {
                params['role'] = role;
            }
            
            const response = await getUsers(params);
            const result = await response.json();

            if (result['data']) {
                setFirstPage(result['first']);
                setPrevPage(result['prev']);
                setNextPage(result['next']);
                setLastPage(result['last']);
                setNumberOfPages(result['pages']);
                setNumberOfItems(result['users']);
                setUsers(result['data']);
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
        fetchUsers();
    }, [page, role]);

    const handleConfirmDelete = (id) => {
        if(!id) {
            console.error('Id jest undefined');
            return;
        }
        
        const toastId = toast.info((
            <div>
                <p>Czy na pewno chcesz usunąć ten produkt?</p>
                <div className='toast-div'>
                    <button onClick={() => handleDeleteUsers(id, toastId)}>Usuń</button>
                    <button onClick={() => toast.dismiss(toastId)}>Anuluj</button>
                </div>
            </div>
        ), {
            className: "custom-toast",
            autoClose: false,
        });
              
    };    

    const handleDeleteUsers = async (id, toastId) => {
        if (!id) {
            console.error('Id jest undefined');
            return;
        }

        try {
            const response = await deleteUser(id);
    
            if (!response.ok) {
                throw new Error('Wystąpił błąd podczas usuwania użytkownika.');
            }
    
            setUsers((prev) => prev.filter((product) => product.id !== id));
    
            toast.success('Produkt został usunięty!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            toast.dismiss(toastId);
        } catch (err) {
            toast.error(err.message || 'Nie udało się usunąć użytkownika.', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            toast.dismiss(toastId);
        } finally {
            await fetchUsers();
            toast.dismiss(toastId);
        }
    };

    const handleSaveUsers = async (updatedUser) => {
        await fetchUsers();
        setUserToEdit(null);
    
        toast.success('Użytkownik został zaktualizowany!', {
            position: 'top-right',
            autoClose: 5000,
        });
    };

    const handleCancelEdit = () => {
        setUserToEdit(null);
    };

    return (
        <div className="search-user">
            <SearchBar data={users} setConfirmedResults={setConfirmedResults} type="users" />

            <div className="filter">
                <input type="button" value="&lt;&lt;" disabled={page === 1} onClick={() => {setPage(firstPage)}}></input>
                <input type="button" value="&lt;" disabled={prevPage === null} onClick={() => { if (prevPage) setPage(prevPage);}}></input>
                <span>{page} z {numberOfPages}</span>
                <input type="button" value="&gt;" disabled={nextPage === null} onClick={() => { if (nextPage) setPage(nextPage);}}></input>
                <input type="button" value="&gt;&gt;" disabled={page === numberOfPages} onClick={() => {setPage(lastPage)}}></input>
                <span>Liczba sztuk: {numberOfItems}</span>
            </div>

            <section className="admin-search_users"  ref={searchUserItemRef}>
                <button className='button-reset' onClick={() => setConfirmedResults([])}>Resetuj</button>
                {confirmedResults.length === 0 ? (
                    <p className='search-empty'>Brak wyników do wyświetlenia. Spróbuj wyszukać produkt powyżej.</p>
                ) : (
                    <table className="admin-search_table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Imię</th>
                                <th>Nazwisko</th>
                                <th>Nazwa użytkownika</th>
                                <th>Email</th>
                                <th>Hasło</th>
                                <th>Rola</th>
                                <th>Edytuj</th>
                                <th>Usuń</th>
                            </tr>
                        </thead>
                        <tbody>
                            {confirmedResults.map((user) => (
                                <React.Fragment key={user.id}>
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.first_name || 'Brak'}</td>
                                    <td>{user.last_name || 'Brak'}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.hashed_password ? '✔️' : '❌'}</td>
                                    <td>{user.is_admin ? 'Admin' : 'Użytkownik'}</td>

                                    <td><button className='button-edit' onClick={() => setUserToEdit(user)}>Edytuj</button></td>
                                    <td><button className='button-delete' onClick={() => handleConfirmDelete(user.id)}>Usuń</button></td>
                                </tr>
                                {userToEdit && userToEdit.id === user.id && (
                                    <tr className="edit-product open">
                                        <td colSpan="11">
                                                <EditUser
                                                    user={userToEdit}
                                                    onSave={handleSaveUsers}
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
                <div className="filter">
                    <div className="filter-category filter-center">
                        <input type="button" value="&lt;&lt;" disabled={page === 1} onClick={() => {setPage(firstPage); scrollToTop()}}></input>
                        <input type="button" value="&lt;" disabled={prevPage === null} onClick={() => { if (prevPage) setPage(prevPage); scrollToTop()}}></input>
                        <span>{page} z {numberOfPages}</span>
                        <input type="button" value="&gt;" disabled={nextPage === null} onClick={() => { if (nextPage) setPage(nextPage); scrollToTop()}}></input>
                        <input type="button" value="&gt;&gt;" disabled={page === numberOfPages} onClick={() => {setPage(lastPage); scrollToTop()}}></input>
                    </div>
                </div>
            </section>

            <section className="admin-search_users-mobile"ref={searchUserItemRef}>
                <button className='button-reset' onClick={() => setConfirmedResults([])}>Resetuj</button>
                {confirmedResults.length === 0 ? (
                    <p className='search-empty'>Brak wyników do wyświetlenia. Spróbuj wyszukać użytkowników powyżej.</p>
                ) : (
                    <div className="search-mobile">
                        {confirmedResults.map((user) => (
                            <div className="search-mobile_user" key={user.id}>
                                <div className="user-details">
                                    <p><span>ID: </span>{user.id}</p>
                                    <p><span>Imię: </span>{user.first_name}</p>
                                    <p><span>Nazwisko: </span>{user.last_name}</p>
                                    <p><span>Nazwa użytkownika: </span>{user.username}</p>
                                    <p><span>Email: </span>{user.email}</p>
                                    <p><span>Hasło: </span>{user.hashed_password ? '✔️' : '❌'}</p>
                                    <p><span>Rola: </span>{user.is_admin ? 'Admin' : 'Użytkownik'}</p>

                                    <div className="mobile-button">
                                        <button className='button-edit' onClick={() => setUserToEdit(user)}>Edytuj</button>
                                        <button className='button-delete' onClick={() => handleConfirmDelete(user.id)}>Usuń</button>
                                    </div>
                                </div>
                                {userToEdit && userToEdit.id === user.id && (
                                    <div className="edit-product-mobile open">
                                        <EditUser
                                            user={userToEdit}
                                            onSave={handleSaveUsers}
                                            onCancel={handleCancelEdit}
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
                <div className="filter">
                    <div className="filter-category filter-center">
                        <input type="button" value="&lt;&lt;" disabled={page === 1} onClick={() => {setPage(firstPage); scrollToTop()}}></input>
                        <input type="button" value="&lt;" disabled={prevPage === null} onClick={() => { if (prevPage) setPage(prevPage); scrollToTop()}}></input>
                        <span>{page} z {numberOfPages}</span>
                        <input type="button" value="&gt;" disabled={nextPage === null} onClick={() => { if (nextPage) setPage(nextPage); scrollToTop()}}></input>
                        <input type="button" value="&gt;&gt;" disabled={page === numberOfPages} onClick={() => {setPage(lastPage); scrollToTop()}}></input>
                    </div>
                </div>
            </section>
            <CreateUser/>
        </div>
    );
};

export default SearchUser;
