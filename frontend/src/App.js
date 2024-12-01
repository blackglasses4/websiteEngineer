import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartProvider } from './Components/Cart/CartContext'; 

// Komponenty
import Navbar from './Components/Navbar/Navbar';
import Ad from './Components/Ad/Ad';
import Footer from './Components/Footer/Footer';
import NavbarCategory from './Components/Navbar/NavbarCategory';
import DisplayProduct from './Components/DisplayProduct/DisplayProduct';
import CartPage from './Components/Cart/CartPage/CartPage';

// Strony
import Login from './Pages/Login/Login';
import Registration from './Pages/Registration/Registration';
import Home from './Pages/Home/Home';
import CategoryProducts from './Components/CategoryProduct/CategoryProduct';
import Admin from './Components/Admin/Admin';

// Główny układ z Navbar, Kategoriami i Footerem
function AppLayout() {
  return (
    <>
      <Ad />
      <Navbar />
      <NavbarCategory />
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Home />} />
              <Route path=":category" element={<CategoryProducts />} />
              <Route path='product/:id' element={<DisplayProduct/>} />
              <Route path="cart" element={<CartPage />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/admin/*" element={<Admin />} />
          </Routes>
          <ToastContainer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
