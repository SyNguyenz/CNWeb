import Home from '../pages/Home';
import Order from '../pages/Order';
import AdminPage from '../pages/AdminPage/AdminPage';

// public Routes

const publicRoutes=[
    {path: '/', component: Home},
    {path: '/Order', component: Order},
    {path: '/AdminPage', component: AdminPage},
];

const privateRoutes=[

];

export{
    publicRoutes,privateRoutes
}