import Home from '../pages/Home';
import Order from '../pages/Order';
import Product from '../pages/Product/Product';
import RegisterPage from '../pages/RegisterAccount';
import LoginPage from '../pages/Login';
import Admin from '../pages/AdminPage/AdminPage';
import userLayout from '../pages/userLayout/userLayout';
import adminLayout from '../pages/AdminPage/adminLayout';
import Category from '../pages/Category/Category'
import { Layout } from 'antd';

// public Routes

const publicRoutes=[
    {path: '/', component: Home, layout: userLayout},
    {path: '/Order', component: Order, layout: userLayout},
    {path: '/product', component: Product, layout: userLayout},
    {path: ':productId', component: Product, layout: userLayout},
    {path: '/register', component:RegisterPage, layout: userLayout},
    {path: '/login', component:LoginPage, layout: userLayout},
    {path: '/admin', component: Admin, layout: adminLayout},
    {path: '/phone', component: <Category category="Phone" />, layout: userLayout},
    {path: ':brandName', component: <Category category="Phone" />, layout: userLayout},
    {path: '/laptop', component: <Category category="Laptop" />, layout: userLayout},
    {path: ':brandName', component: <Category category="Laptop" />, layout: userLayout},
];

const privateRoutes=[


];

export{
    publicRoutes,privateRoutes
}