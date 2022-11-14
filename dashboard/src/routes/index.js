import Categories from '~/pages/Categories';
import Dashboard from '~/pages/Dashboard';
import Orders from '~/pages/Orders';
import Product from '~/pages/Product';
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
        path: '/product/:id',
        title: 'Product',
        component: Product,
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
];
