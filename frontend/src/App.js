import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartProvider } from './Components/Cart/CartContext'; 
import { LikeProvider } from './Components/LikeButton/LikeContext';
import { ProductsProvider } from './Components/LikeButton/ProductContext';
import { UserProvider } from './Pages/UserContext';

// Komponenty
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import NavbarCategory from './Components/Navbar/NavbarCategory';
import DisplayProduct from './Components/DisplayProduct/DisplayProduct';
import CartPage from './Components/Cart/CartPage/CartPage';
import LikedProduct from './Components/LikeButton/LikedProduct';

// Strony
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Home from './Pages/Home/Home';
import CategoryProducts from './Components/CategoryProduct/CategoryProduct';
import Admin from './Components/Admin/Admin';
import DisplayProductPage from './Components/DisplayProduct/SimilarProduct/DisplayProductPage';
import Order from './Components/Order/Order';


// Główny układ z Navbar, Kategoriami i Footerem
function AppLayout() {
  return (
    <>
      <Navbar/>
      <NavbarCategory className="nav-category"/>
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

function App() {
  return (
    <UserProvider>
      <ProductsProvider>
        <LikeProvider>
          <CartProvider>
            <Router>
              <div className="App">
                <Routes>
                  <Route path="/" element={<AppLayout />}>
                    <Route index element={<Home />} />
                    <Route path=":category" element={<CategoryProducts />} />
                    <Route path='product/:id' element={<DisplayProductPage/>} />
                    <Route path="cart" element={<CartPage />} />
                    <Route path="/liked" element={<LikedProduct />} />
                    <Route path="order" element={<Order />} />
                  </Route>

                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/admin/*" element={<Admin />} />
                </Routes>
                <ToastContainer />
              </div>
            </Router>
          </CartProvider>
        </LikeProvider>
      </ProductsProvider>
    </UserProvider>
  );
}

export default App;
