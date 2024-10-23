import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { ToastContainer } from 'react-toastify';

//component Inżynierka
import Navbar from './components/Navbar/Navbar';
import Ad from './components/Ad/Ad';
import Footer from './components/Footer/Footer';

//page
import Login from './pages/Login/Login';
//import Logout from './pages/Logout/Logout';
import Registration from './pages/Registration/Registration';

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
