import Banner from '~/pages/Banner';
import Categories from '~/pages/Categories';
import Dashboard from '~/pages/Dashboard';
import Orders from '~/pages/Orders';
import Products from '~/pages/Products';
import Profile from '~/pages/Profile';
import Sellers from '~/pages/Sellers';
import Users from '~/pages/Users';

export const routes = [
    {
        path: '/',
        title: 'Dashboard',
        component: Dashboard,
    },
    {
        path: '/profile',
        title: 'Profile',
        component: Profile,
    },
    {
        path: '/categories',
        title: 'Categories',
        component: Categories,
    },
    {
        path: '/orders',
        title: 'Orders',
        component: Orders,
    },
    {
        path: '/products',
        title: 'Products',
        component: Products,
    },
    {
        path: '/sellers',
        title: 'Sellers',
        component: Sellers,
    },
    {
        path: '/users',
        title: 'Users',
        component: Users,
    },
    {
        path: '/banner',
        title: 'Set Banner',
        component: Banner,
    },
];
