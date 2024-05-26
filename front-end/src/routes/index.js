import Home from '../pages/Home/Home';
import Order from '../pages/Order';
import Product from '../pages/Product/Product';
import RegisterPage from '../pages/RegisterAccount';
import LoginPage from '../pages/Login';
import Admin from '../pages/AdminPage/AdminPage';
import userLayout from '../pages/userLayout/userLayout';
import adminLayout from '../pages/AdminPage/adminLayout';
import Category from '../pages/Category/Category'
import Checkout from '../pages/Checkout/Checkout';
import UserProfile from '../pages/UserProfile/UserProfile';
import CheckOrder from '../pages/CheckOrder/CheckOrder';

// public Routes

const publicRoutes=[
    {path: '/', component: Home, layout: userLayout},
    {path: '/product', component: Product, layout: userLayout, childPath: ':productId'},
    {path: '/register', component:RegisterPage, layout: userLayout},
    {path: '/login', component:LoginPage, layout: userLayout},
    {path: '/order',component:Order, layout: userLayout},
    {path: '/admin', component: Admin, layout: adminLayout},
    {path: '/phone', component: Category, layout: userLayout, childPath: ':brandName', category: 'Phone'},
    {path: '/may giat', component: Category, layout: userLayout, childPath: ':brandName', category: 'May giat'},
    {path: '/laptop', component: Category, layout: userLayout, childPath: ':brandName', category: 'Laptop'},
    {path: '/TV', component: Category, layout: userLayout, childPath: ':brandName', category: 'TV'},
    {path: '/dieu hoa', component: Category, layout: userLayout, childPath: ':brandName', category: 'Dieu hoa'},
    {path: '/tu lanh', component: Category, layout: userLayout, childPath: ':brandName', category: 'Tu lanh'},
    {path: '/smarthome', component: Category, layout: userLayout, childPath: ':brandName', category: 'Smart home'},
    {path: '/am thanh', component: Category, layout: userLayout, childPath: ':brandName', category: 'Am thanh'},
    {path: '/user_profile',component: UserProfile, layout: userLayout},
    {path: '/checkout', component: Checkout, layout: userLayout},
    {path: '/check', component: CheckOrder, layout: userLayout},

];

const privateRoutes=[


];

export{
    publicRoutes,privateRoutes
}