import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUsers, addUser } from '../../backend';

import '../CreateProduct/Create.scss';

const CreateUser = () => {
    const initialUserState = {
        id: '',
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        isAdmin: false,
    };

    const [user, setUser] = useState(initialUserState);
    const [loading, setLoading] = useState(false);
    // const [imagePreview, setImagePreview] = useState(null);
    const [users, setUsers] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            //do zmiany
            const response = await getUsers();
            const data = await response.json();
            setUsers(data);
        };

        fetchUsers();
    }, []);

    const handleInputChange = (e) => {
        const { type, name, value, checked } = e.target;

        // Dostosowanie dla checkboxów
        if (type === 'checkbox' && name === 'isAdmin') {
            setUser((prev) => ({
                ...prev,
                isAdmin: checked,
            }));
        }
        // Dostosowanie dla tekstowych pól input
        else if (type !== 'checkbox' && name !== 'isAdmin') {
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
                first_name: user.firstName,
                last_name: user.lastName,
                username: user.username,
                email: user.email,
                password: user.password,
                is_admin: user.isAdmin ? user.isAdmin : null, 
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
            setUsers((prev) => [...prev, userData]);
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
                    <label htmlFor="firstName">
                        Imię:
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            maxLength="30"
                            value={user.firstName}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label htmlFor="lastName">
                        Nazwisko:
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            maxLength="30"
                            value={user.lastName}
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

                    <label htmlFor="isAdmin">
                        Administrator:
                        <input
                            type="checkbox"
                            name="isAdmin"
                            id="isAdmin"
                            checked={user.isAdmin}
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