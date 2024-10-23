import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { ToastContainer } from 'react-toastify';

//component Inżynierka
import Navbar from './Components/Navbar/Navbar';
import Ad from './Components/Ad/Ad';
import Footer from './Components/Footer/Footer';

//page
import Login from './Pages/Login/Login';
//import Logout from './pages/Logout/Logout';
import Registration from './Pages/Registration/Registration';

//apollo client 
const client = new ApolloClient({
  uri: 'http://localhost:1337/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <Routes>
            <Route exact path="/" element={
              <>
                <Ad />
                <Navbar />
                {/* <Homepage /> */}
                <Footer />
              </>
            } />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/registration" element={<Registration />} />
            {/* <Route path="/details/:id" element={<ReviewDetails />} />
            <Route path="/genre/:id" element={<Genre />} /> */}
          </Routes>
          <ToastContainer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
