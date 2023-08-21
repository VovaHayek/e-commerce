import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import ProductsPage from './pages/ProductsPage'
import CartPage from './pages/CartPage'
import Header from './components/Header'
import Logout from './components/Logout'
import AuthenticationPage from './pages/AuthenticationPage'

function App() {
  return (
    <Router>
      <div className="container-fluid m-0 p-0">
        <Header />
        <Routes>
          <Route path="/" exact Component={ProductsPage} />
          <Route path='/cart/' Component={CartPage} />
          <Route path='/login/' Component={AuthenticationPage} />
          <Route path='/logout/' Component={Logout} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
