import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import { CartProvider } from './components/CartContext/CartContext';
import { AuthProvider } from './components/AuthContext/AuthContext';
import useSignalR from './components/useSignalR/useSignalR';

function App() {
  const handleReceiveMessage = (message) => {
              console.log("Received message:", message);
            };
        
            const handleNewOrderCreated = (order) => {
                console.log("New order created:", order);
            };
            useSignalR(handleReceiveMessage, handleNewOrderCreated);
  return (
    <>
    <AuthProvider>
      <BrowserRouter>
          <CartProvider>
            <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.component
              const Layout = route.layout
              let category = route.category
              

              return (
                <Route key={index} path={route.path} element={
                  <Layout>
                    <Page category={category}></Page>
                  </Layout>
                }>
                  <Route path={route.childPath} element={
                  <Layout>
                    <Page category={category}></Page>
                  </Layout>
                }> </Route>
                </Route>
              )
            })}
          </Routes>
          </CartProvider>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
