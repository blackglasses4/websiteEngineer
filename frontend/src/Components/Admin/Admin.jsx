import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch';
import CreateProduct from '../CreateProduct/CreateProduct';
// import SearchProducts from '../SearchProducts/SearchProducts';
import Sidebar from '../Sidebar/Sidebar';
import './Admin.scss';

const WelcomeAdmin = () => {
    return (
        <div className="welcome-admin">
            <h2>Witaj w panelu administracyjnym!</h2>
            <p>Wybierz opcję z menu po lewej stronie, aby rozpocząć zarządzanie produktami.</p>
        </div>
    );
};

const Admin = () => {
    const [activeView, setActiveView] = useState(null);

    useEffect(() => {
        toast.success('Witaj w panelu administracyjnym!', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }, []);

    const renderContent = () => {
        switch (activeView) {
            case 'createProduct':
                return <CreateProduct />;
            case 'searchProducts':
                return <p className="p-admin_info">Komponent wyszukiwania jest jeszcze w budowie!</p>;
            default:
                return <WelcomeAdmin />;
        }
    };

    return (
        <>
            <header className='header-admin'>
                <a href="/" className='a-name' rel='internal'>NAZWA</a>
                <h3>Admin Panel</h3>
                <div className='nav-icons'>
                    <ThemeSwitch />
                    <a href="/"><FaUserCircle /></a>
                </div>
            </header>

            <div className="admin-container">
                {/* Sidebar */}
                <Sidebar onSelect={(view) => setActiveView(view)} />

                {/* Main Content */}
                <main className="admin-main">
                    {renderContent()}
                </main>
            </div>

            <ToastContainer />
        </>
    );
};

export default Admin;
