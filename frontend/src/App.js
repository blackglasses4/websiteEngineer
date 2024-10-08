import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

//page & layout imports
import Homepage from './pages/Homepage'
import ReviewDetails from './pages/ReviewDetails'
import Genre from './pages/Genre'
import SiteHeader from './components/SiteHeader'

//apollo client 
const client = new ApolloClient({
  uri: 'http://localhost:1337/graphql',
  cache: new InMemoryCache()
})
//dfgfgfgdgd
////fgdfggd
function App() {
  return (
    <Router>
      <ApolloProvider client={client}>
        <div className="App">
          <SiteHeader />
          <Routes>
            <Route exact path="/" element={<Homepage />}/>
            <Route path="/details/:id" element={<ReviewDetails />}/>
            <Route path="/genre/:id" element={<Genre />}/>
          </Routes>
        </div>
      </ApolloProvider>
    </Router>
  );
}

export default App;
