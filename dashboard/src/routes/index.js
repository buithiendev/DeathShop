import Categories from '~/pages/Categories';
import Dashboard from '~/pages/Dashboard';
import Orders from '~/pages/Orders';
import Products from '~/pages/Products';
import Sellers from '~/pages/Sellers';
import Users from '~/pages/Users';

export const routes = [
    {
        path: '/',
        title: 'Dashboard',
        component: Dashboard,
    },
    {
        path: '/categories',
        title: 'Dashboard',
        component: Categories,
    },
    {
        path: '/orders',
        title: 'Dashboard',
        component: Orders,
    },
    {
        path: '/products',
        title: 'Dashboard',
        component: Products,
    },
    {
        path: '/sellers',
        title: 'Dashboard',
        component: Sellers,
    },
    {
        path: '/users',
        title: 'Dashboard',
        component: Users,
    },
];
