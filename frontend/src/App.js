import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// Komponenty
import Navbar from './Components/Navbar/Navbar';
import Ad from './Components/Ad/Ad';
import Footer from './Components/Footer/Footer';
import NavbarCategory from './Components/Navbar/NavbarCategory';
import DisplayProduct from './Components/DisplayProduct/DisplayProduct';

// Strony
import Login from './Pages/Login/Login';
import Registration from './Pages/Registration/Registration';
import Home from './Pages/Home/Home';
import CategoryProducts from './Components/CategoryProduct/CategoryProduct';

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
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path=":category" element={<CategoryProducts />} />
            <Route path='product/:id' element={<DisplayProduct/>} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
