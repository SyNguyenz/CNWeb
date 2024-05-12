import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer'
import Home from './pages/Home';
import Product from './pages/Product/Product'
import Category from './pages/Category/Category'

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/phone' element={<Category category="Phone"/>}>
            <Route path=':brandName' element={<Category category="Phone" />} />
          </Route>
          <Route path='/laptop' element={<Category category="Laptop"/>}>
            <Route path=':brandName' element={<Category category="Laptop" />} />
          </Route>
          <Route path='/' element={<Home />} />
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
