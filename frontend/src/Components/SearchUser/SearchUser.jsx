import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BACKEND_URL} from '../config';
import { FaSlidersH } from 'react-icons/fa';
import { getUsers } from '../../backend';
import useClick from '../useClick';

import CreateUser from '../CreateUser/CreateUser';
import SearchBar from '../SearchProduct/SearchBar';
import EditUser from './EditUser';

import '../Filter/Filter.scss';
import '../SearchProduct/Search.scss';

const SearchUser = () => {
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

    //filtrowanie
    // const [gender, setGender] = useState();
    //sortortowanie
    const [role, setRole] = useState();

    const fetchUsers = async () => {
        try {
            const params = {
                '_page': page,
                '_per_page': 8
            }
            
            if (role) {
                params['role'] = role;
            }
            
            //get Users
            const response = await getUsers(params);
            const result = await response.json();

            setFirstPage(result['first']);
            setPrevPage(result['prev']);
            setNextPage(result['next']);
            setLastPage(result['last']);
            setNumberOfPages(result['pages']);
            setNumberOfItems(result['items']);

            const userList = result['data'];
            setUsers(userList);
            setConfirmedResults(userList);
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
            const response = await fetch(`${BACKEND_URL}/users/${id}`, {
                method: 'DELETE',
            });
    
            if (!response.ok) {
                throw new Error('Wystąpił błąd podczas usuwania produktu.');
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
            toast.error(err.message || 'Nie udało się usunąć produktu.', {
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
            toast.dismiss(toastId);
        }
    };

    const handleSaveUsers = (updatedUser) => {
        setUsers((prevUsers) => prevUsers.map((user) => 
            user.id === updatedUser.id ? updatedUser : user
        ));
    
        setConfirmedResults((prevConfirmedResults) => prevConfirmedResults.map((user) => 
            user.id === updatedUser.id ? updatedUser : user
        ));
    
        setUserToEdit(null); // Zamykamy tryb edycji po zapisaniu zmian
    
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
            <h1 className='admin-h1'>Dodaj nowego użytkownika</h1>
            <CreateUser/>
            <h1 className='admin-h1'>Wyszukaj użytkownika</h1>

            <SearchBar data={users} setConfirmedResults={setConfirmedResults} type="users" />

            <div className="filter">
                <input type="button" value="Pierwsza" disabled={page === 1} onClick={() => {setPage(firstPage)}}></input>
                <input type="button" value="Poprzednia" disabled={prevPage === null} onClick={() => {setPage(prevPage)}}></input>
                <span>{page} z {numberOfPages}</span>
                <input type="button" value="Następna" disabled={nextPage === null} onClick={() => {setPage(nextPage)}}></input>
                <input type="button" value="Ostatnia" disabled={page === numberOfPages} onClick={() => {setPage(lastPage)}}></input>
                <span>Liczba sztuk: {numberOfItems}</span>

                <div className="product-filter">
                    <button className="filter-toggle" onClick={() => setIsFilterOpen(!isFilterOpen)}>
                        <FaSlidersH />Wszystkie filtr
                    </button>

                    {isFilterOpen && (
                        <div className="filter-panel" ref={filterPanelRef}>
                            <div className="filter-group">
                                <label>Filtruj według płci:</label>
                                {/* <select
                                    id="role-filter"
                                    value={role || 'all'}
                                    onChange={(e) => {
                                        const selectedRole = e.target.value === 'all' ? null : e.target.value;
                                        setRole(selectedRole);
                                        setPage(1);
                                    }}>
                                    <option value="all">Wszyscy</option>
                                    <option value="user">Uzytkownicy</option>
                                    <option value="admin">Administrator</option>
                                </select> */}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <section className="admin-search_users">
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
                                    <td>{user.firstName || 'Brak'}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.password}</td>
                                    <td>{user.isAdmin === true ? 'Admin' : 'Użytkownik'}</td>

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
            </section>

            <section className="admin-search_users-mobile">
                <button className='button-reset' onClick={() => setConfirmedResults([])}>Resetuj</button>
                {confirmedResults.length === 0 ? (
                    <p className='search-empty'>Brak wyników do wyświetlenia. Spróbuj wyszukać użytkowników powyżej.</p>
                ) : (
                    <div className="search-mobile">
                        {confirmedResults.map((user) => (
                            <div className="search-mobile_user" key={user.id}>
                                <div className="user-details">
                                    <p><span>ID: </span>{user.id}</p>
                                    <p><span>Imię: </span>{user.firstName}</p>
                                    <p><span>Nazwisko: </span>{user.lastName}</p>
                                    <p><span>Nazwa użytkownika: </span>{user.username}</p>
                                    <p><span>Email: </span>{user.email}</p>
                                    <p><span>Hasło: </span>{user.password}</p>
                                    <p><span>Rola: </span>{user.isAdmin ? 'Admin' : 'Użytkownik'}</p>

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
            </section>
        </div>
    );
};

export default SearchUser;
