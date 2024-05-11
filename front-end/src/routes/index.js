import Home from '../pages/Home';
import Order from '../pages/Order';
import Product from '../pages/Product/Product';
import RegisterPage from '../pages/RegisterAccount';
import LoginPage from '../pages/Login';


// public Routes

const publicRoutes=[
    {path: '/', component: Home},
    {path: '/Order', component: Order},
    {path: '/product', component: Product},
    {path: '/register', component:RegisterPage},
    {path: '/login', component:LoginPage}
];

const privateRoutes=[


];

export{
    publicRoutes,privateRoutes
}