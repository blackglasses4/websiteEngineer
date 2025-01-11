import React, { useEffect, useState, useRef } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { FiMenu } from "react-icons/fi";
import { useUser } from '../../Pages/UserContext';

import ThemeSwitch from '../ThemeSwitch/ThemeSwitch';
import SearchProduct from '../SearchProduct/SearchProduct';
import SearchOrder from '../SearchOrder/SearchOrder';
import SearchUser from '../SearchUser/SearchUser';

import Sidebar from '../Sidebar/Sidebar';
import './Admin.scss';

import useClick from '../useClick';

const checkAdmin = () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (!token || !user || user.is_admin === undefined) {
        console.error("Brak danych użytkownika lub nie jest administratorem.");
        return false;
    }

    return user.is_admin;
};

const WelcomeAdmin = () => {
    return (
        <div className="welcome-admin">
            <h2>Witaj w panelu administracyjnym!</h2>
            <p>Wybierz opcję z górnego menu, aby rozpocząć zarządzanie danymi.</p>
        </div>
    );
};

const Admin = () => {
    const navigate = useNavigate();
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const { logout } = useUser(); 

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    useEffect(() => {
        if (!checkAdmin()) {
            toast.error('Brak dostępu do panelu administracyjnego!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            
            logout();
            navigate("/login");
            return;
        }
    }, [navigate]);

    const handleLogout = () => {
        logout();
        toast.success("Wylogowałeś się!");
        setTimeout(() => {
            navigate("/login");
        }, 1000);
    };

    return (
        <>
            <header className='header-admin'>
                <Link to="/admin" className='link-name' rel='internal'>
                    <LazyLoadImage
                        src="/images/logo.png"
                        effect="blur"
                        className="logo"
                        alt="Logo sklepu"
                        width="100px"
                        height="auto"
                    />
                </Link>
                <div className='nav-icons'>
                    <ThemeSwitch />
                    <button onClick={handleLogout}>
                        <FaUserCircle />
                    </button>
                    <button className="sidebar-toggle" onClick={toggleSidebar}>
                        <FiMenu className="icon" />
                    </button>
                </div>
            </header>

            <div className="admin-container">
                <Sidebar 
                    onSelect={(view) => navigate(`/admin/${view}`)} 
                    isSidebarVisible={isSidebarVisible} 
                    toggleSidebar={toggleSidebar} 
                />

                {/* Main Content */}
                <main className="admin-main">
                    <Routes>
                        <Route path="/" element={<WelcomeAdmin />}></Route>
                        <Route path="products" element={<SearchProduct />}></Route>
                        <Route path="orders" element={<SearchOrder />}></Route>
                        <Route path="users" element={<SearchUser />}></Route>
                    </Routes>
                </main>
            </div>
        </>
    );
};

export default Admin;