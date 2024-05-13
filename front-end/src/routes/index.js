import Home from '../pages/Home';
import Order from '../pages/Order';
import Product from '../pages/Product/Product';
import RegisterPage from '../pages/RegisterAccount';
import LoginPage from '../pages/Login';
import Admin from '../pages/AdminPage/AdminPage';
import userLayout from '../pages/userLayout/userLayout';
import adminLayout from '../pages/AdminPage/adminLayout';
import { Layout } from 'antd';

// public Routes

const publicRoutes=[
    {path: '/', component: Home, layout: userLayout},
    {path: '/Order', component: Order, layout: userLayout},
    {path: '/product', component: Product, layout: userLayout},
    {path: '/register', component:RegisterPage, layout: userLayout},
    {path: '/login', component:LoginPage, layout: userLayout},
    {path: '/admin', component: Admin, layout: adminLayout},
];

const privateRoutes=[


];

export{
    publicRoutes,privateRoutes
}