import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BACKEND_URL} from '../config';

import '../SearchProduct/Edit.scss';

const EditUser = ({ user, onSave, onCancel }) => {
    const [editForm, setEditForm] = useState({
        id: user.id,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        username: user.username || '',
        email: user.email || '',
        password: user.password || '',
        isAdmin: user.isAdmin || false,
    });    

    useEffect(() => {
        setEditForm({
            id: user.id,
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            username: user.username || '',
            email: user.email || '',
            password: user.password || '',
            isAdmin: user.isAdmin || false,
        });
    }, [user]);


    const validateForm = () => {
        if (!editForm.firstName) return 'Imię jest wymagane.';
        if (!editForm.lastName) return 'Nazwisko jest wymagane.';
        if (!editForm.username) return 'Nazwa użytkownika jest wymagana.';
        if (!editForm.email) return 'Email jest wymagany.';
        if (!editForm.password) return 'Hasło jest wymagane.';
        return null;
    };

    const handleSaveUser = async (e) => {
        e.preventDefault();
        const error = validateForm();
        if (error) {
            toast.error(error, { position: 'top-right', autoClose: 5000 });
            return;
        }
        try {
            const response = await fetch(`${BACKEND_URL}/users/${editForm.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: editForm.id,
                    firstName: editForm.firstName,
                    lastName: editForm.lastName,
                    username: editForm.username,
                    email: editForm.email,
                    password: editForm.password,
                    isAdmin: editForm.isAdmin,
                }),
            });

            if (!response.ok) {
                throw new Error('Wystąpił błąd podczas aktualizacji użytkownika.');
            }

            const updatedUser = await response.json();
            onSave(updatedUser);
        } catch (error) {
            toast.error(error.message || 'Nie udało się zaktualizować użytkownika.', {
                position: 'top-right',
                autoClose: 5000,
            });
        }
    };
    
    return (
        <>
        <table className="edit-user-form">
            <tbody>
                <tr>
                    <td>
                        <label>
                            Imię:
                            <input
                                id="input-text"
                                type="text"
                                value={editForm.firstName || ''}
                                onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
                            />
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>
                            Nazwisko:
                            <input
                                id="input-text"
                                type="text"
                                value={editForm.lastName || ''}
                                onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
                            />
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>
                            Nazwa użytkownika:
                            <input
                                id="input-text"
                                type="text"
                                value={editForm.username || ''}
                                onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                            />
                        </label>
                    </td>
                </tr>
                <tr>
                <td>
                    <label>
                        Email:
                        <input
                            id="input-text"
                            type="email"
                            value={editForm.email}
                            onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        />
                    </label>
                </td>
                </tr>
                <tr>
                    <td>
                        <label>
                            Hasło:
                            <input
                                id="input-password"
                                type="password"
                                value={editForm.password || ''}
                                onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
                            />
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>
                            Administrator:
                            <input
                                id="input-admin"
                                type="checkbox"
                                checked={editForm.isAdmin || false}
                                onChange={() => setEditForm((prevForm) => ({ ...prevForm, isAdmin: !prevForm.isAdmin }))}
                            />
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <button type="button" className="button-save" onClick={handleSaveUser}>Zapisz</button>
                        <button type="button" className="button-cancel" onClick={onCancel}>Anuluj</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div className="edit-user-form-mobile">
            <p>
                <span>Imię:</span>
                <label>
                    <input
                        id="input-first-name"
                        type="text"
                        value={editForm.firstName || ''}
                        onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
                    />
                </label>
            </p>
            <p>
                <span>Nazwisko:</span>
                <label>
                    <input
                        id="input-last-name"
                        type="text"
                        value={editForm.lastName || ''}
                        onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
                    />
                </label>
            </p>
            <p>
                <span>Nazwa użytkownika:</span>
                <label>
                    <input
                        id="input-username"
                        type="text"
                        value={editForm.username || ''}
                        onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                    />
                </label>
            </p>
            <p>
                <span>Email:</span>
                <label>
                    <input
                        id="input-email"
                        type="email"
                        value={editForm.email || ''}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    />
                </label>
            </p>
            <p>
                <span>Hasło:</span>
                <label>
                    <input
                        id="input-password"
                        type="password"
                        value={editForm.password || ''}
                        onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
                    />
                </label>
            </p>
            <p>
                <span>Administrator:</span>
                <label>
                    <input
                        id="input-admin"
                        type="checkbox"
                        checked={editForm.isAdmin || false}
                        onChange={() => setEditForm((prevForm) => ({ ...prevForm, isAdmin: !prevForm.isAdmin }))}
                    />
                </label>
            </p>
            <div className="button-container">
                <button type="button" className="button-save" onClick={handleSaveUser}>Zapisz</button>
                <button type="button" className="button-cancel" onClick={onCancel}>Anuluj</button>
            </div>
        </div>
        </>
    );
};

export default EditUser;