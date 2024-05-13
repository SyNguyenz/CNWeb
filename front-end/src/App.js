import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { publicRoutes } from './routes';

function App() {
  return (
    <>
      <BrowserRouter>
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
      </BrowserRouter>
    </>
  );
}

export default App;
