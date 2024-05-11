import Home from '../pages/Home';
import Order from '../pages/Order';
import RegisterPage from '../pages/RegisterAccount';
import LoginPage from '../pages/Login';


// public Routes

const publicRoutes=[
    {path: '/', component: Home},
    {path: '/Order', component: Order},
    {path: '/register', component:RegisterPage},
    {path: '/login', component:LoginPage}
];

const privateRoutes=[

];

export{
    publicRoutes,privateRoutes
}