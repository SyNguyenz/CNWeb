import Home from '../pages/Home';
import Order from '../pages/Order';

// public Routes

const publicRoutes=[
    {path: '/', component: Home},
    {path: '/Order', component: Order},
];

const privateRoutes=[

];

export{
    publicRoutes,privateRoutes
}