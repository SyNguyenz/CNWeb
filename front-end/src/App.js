import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import Header and Footer Components
import Header from './components/Header';
import Footer from './components/Footer'

// Import Pages
import Home from './pages/Home';
import Product from './pages/Product/Product'
import LoginPage from './pages/Login';
import Admin from './pages/AdminPage/AdminPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/product' element={<Product />}>
          <Route path=':productId' element={<Product />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
