import Home from '../pages/Home';
import Order from '../pages/Order';
import Product from '../pages/Product/Product';
// public Routes

const publicRoutes=[
    {path: '/', component: Home},
    {path: '/Order', component: Order},
    {path: '/product', component: Product}
];

const privateRoutes=[


];

export{
    publicRoutes,privateRoutes
}