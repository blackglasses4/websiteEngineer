import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editUser2, editUser } from '../../backend';

import '../SearchProduct/Edit.scss';

const EditUser = ({ user, onSave, onCancel }) => {
    const [editForm, setEditForm] = useState({
        id: user.id,
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        username: user.username || '',
        email: user.email || '',
        password: user.password || '',
        is_admin: user.is_admin || false,
    });    

    useEffect(() => {
        if (!user) {
            toast.error('Brak danych użytkownika.', { position: 'top-right', autoClose: 5000 });
            return;
        }

        if (user) {
            setEditForm({
                id: user.id,
                first_name: user.first_name || '',
                last_name: user.last_name || '',
                username: user.username || '',
                email: user.email || '',
                password: user.password || '',
                is_admin: user.is_admin || false,
            });
        }
    }, [user]);

    const validateForm = () => {
        if (!editForm.first_name) return 'Imię jest wymagane.';
        if (!editForm.last_name) return 'Nazwisko jest wymagane.';
        if (!editForm.username) return 'Nazwa użytkownika jest wymagana.';
        if (!editForm.email) return 'Email jest wymagany.';
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
            const response = await editUser2({
                id: editForm.id,
                first_name: editForm.first_name,
                last_name: editForm.last_name,
                username: editForm.username,
                email: editForm.email,
                password: editForm.password,
                is_admin: editForm.is_admin,
            });

            // const response = await fetch(`${BACKEND_URL2}/auth/edit_user/${editForm.id}`, {
            //     method: 'PUT',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         id: editForm.id,
            //         first_name: editForm.firstName,
            //         last_name: editForm.lastName,
            //         username: editForm.username,
            //         email: editForm.email,
            //         password: editForm.password,
            //         is_admin: editForm.is_admin,
            //     }),
            // });

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
                                value={editForm.first_name || ''}
                                onChange={(e) => setEditForm({ ...editForm, first_name: e.target.value })}
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
                                value={editForm.last_name || ''}
                                onChange={(e) => setEditForm({ ...editForm, last_name: e.target.value })}
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
                                checked={editForm.is_admin || false}
                                onChange={() => setEditForm((prevForm) => ({ ...prevForm, is_admin: !prevForm.is_admin }))}
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
                        checked={editForm.is_admin || false}
                        onChange={() => setEditForm((prevForm) => ({ ...prevForm, is_admin: !prevForm.is_admin }))}
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