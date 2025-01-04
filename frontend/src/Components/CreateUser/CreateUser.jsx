import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUsers, addUser } from '../../backend';

import '../CreateProduct/Create.scss';

const CreateUser = () => {
    const initialUserState = {
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        is_admin: false,
    };

    const [user, setUser] = useState(initialUserState);
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await getUsers();
            const data = await response.json();
            setUsers(data);
        };

        fetchUsers();
    }, []);

    const handleInputChange = (e) => {
        const { type, name, value, checked } = e.target;

        // Dostosowanie dla checkboxów
        if (type === 'checkbox' && name === 'is_admin') {
            setUser((prev) => ({
                ...prev,
                is_admin: checked,
            }));
        }
        // Dostosowanie dla tekstowych pól input
        else if (type !== 'checkbox' && name !== 'is_admin') {
            setUser((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const newId = users.length ? Math.max(...users.map(p => p.id)) + 1 : 1;

            const userData = {
                id: newId,
                first_name: user.first_name,
                last_name: user.last_name,
                username: user.username,
                email: user.email,
                password: user.password,
                is_admin: user.is_admin ? user.is_admin : null, 
            };

            const response = await addUser(userData);

            const data = await response.json();
            console.log(data);

            if (!response.ok) {
                toast.error('Wystąpił błąd podczas dodawania użytkownika.', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                throw new Error('Wystąpił błąd podczas dodawania użytkownika.');
            }

            toast.success('Użytkownik został pomyślnie dodany!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            // Resetowanie formularza
            setUser(initialUserState);
            setUsers((prev) => Array.isArray(prev) ? [...prev, userData] : [userData]);
        }
        catch (err){
            toast.error(err.message || 'Coś poszło nie tak.', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        finally {
            setLoading(false);
        }
    }

    const toggleForm = () => {
        setIsFormOpen(!isFormOpen);
    };

    return (
        <div className="create-user">
            <button className="toggle-form-btn" onClick={toggleForm}>
                {isFormOpen ? 'Zwiń formularz' : 'Rozwiń formularz'}
            </button>

            <div className={`form-container ${isFormOpen ? 'open' : ''}`}>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="first_name">
                        Imię:
                        <input
                            type="text"
                            name="first_name"
                            id="first_name"
                            maxLength="30"
                            value={user.first_name}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label htmlFor="last_name">
                        Nazwisko:
                        <input
                            type="text"
                            name="last_name"
                            id="last_name"
                            maxLength="30"
                            value={user.last_name}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label htmlFor="username">
                        Nazwa użytkownika:
                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={user.username}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label htmlFor="email">
                        Email:
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={user.email}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label htmlFor="password">
                        Hasło:
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={user.password}
                            onChange={handleInputChange}
                            required
                        />
                    </label>

                    <label htmlFor="is_admin">
                        Administrator:
                        <input
                            type="checkbox"
                            name="is_admin"
                            id="is_admin"
                            checked={user.is_admin}
                            onChange={handleInputChange}
                        />
                    </label>
                    <button type="submit" disabled={loading}>{loading ? 'Dodawanie...' : 'Dodaj użytkownika'}</button>
                </form>
            </div>
        </div>
    )
}

export default CreateUser;