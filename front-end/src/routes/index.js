import Home from '../pages/Home';
import Order from '../pages/Order';
import Product from '../pages/Product/Product';
import RegisterPage from '../pages/RegisterAccount';
import LoginPage from '../pages/Login';
import Admin from '../pages/AdminPage/AdminPage';
import userLayout from '../pages/userLayout/userLayout';
import adminLayout from '../pages/AdminPage/adminLayout';
import Category from '../pages/Category/Category'


// public Routes

const publicRoutes=[
    {path: '/', component: Home, layout: userLayout},
    {path: '/product', component: Product, layout: userLayout, childPath: ':productId'},
    {path: '/register', component:RegisterPage, layout: userLayout},
    {path: '/login', component:LoginPage, layout: userLayout},
    {path: '/order',component:Order, layout: userLayout},
    {path: '/admin', component: Admin, layout: adminLayout},
    {path: '/phone', component: Category, layout: userLayout, childPath: ':brandName', category: 'Phone'},
    {path: '/laptop', component: Category, layout: userLayout, childPath: ':brandName', category: 'Laptop'},
];

const privateRoutes=[


];

export{
    publicRoutes,privateRoutes
}