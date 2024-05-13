import { BrowserRouter, Routes, Route } from 'react-router-dom';


// Import Header and Footer Components
import Header from './components/Header';
import Footer from './components/Footer'

// Import Pages
import Home from './pages/Home';
import Product from './pages/Product/Product'
import LoginPage from './pages/Login';
import Admin from './pages/AdminPage/AdminPage';
import { publicRoutes } from './routes';
import adminLayout from './pages/AdminPage/adminLayout';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component
            let layout = route.layout
            const Layout = layout
            return (
              <Route key={index} path={route.path} element={
                <Layout>
                  <Page></Page>
                </Layout>
              }>

              </Route>
            )
          })}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
