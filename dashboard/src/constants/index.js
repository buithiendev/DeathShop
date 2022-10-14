import { BiAddToQueue, BiBox, BiCartAlt, BiCategory, BiDollarCircle, BiGridAlt, BiUser } from 'react-icons/bi';

export const sideBars = [
    { title: 'Dashboard', path: '/login', icon: <BiGridAlt /> },
    { title: 'Users', path: '/users', icon: <BiUser /> },
    { title: 'Products', path: '/products', icon: <BiBox /> },
    { title: 'Add Products', path: '/', icon: <BiAddToQueue /> },
    { title: 'Categories', path: '/categories', icon: <BiCategory /> },
    { title: 'Orders', path: '/orders', icon: <BiCartAlt /> },
    { title: 'Sellers', path: '/sellers', icon: <BiDollarCircle /> },
    { title: 'Settings', path: '/settings', icon: <BiDollarCircle /> },
];
