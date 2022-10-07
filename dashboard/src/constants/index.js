import { BiAddToQueue, BiBox, BiCartAlt, BiCategory, BiDollarCircle, BiGridAlt, BiUser } from 'react-icons/bi';

export const sideBars = [
    { title: 'Dashboard', path: '/login', icon: <BiGridAlt /> },
    { title: 'Users', path: '/', icon: <BiUser /> },
    { title: 'Products', path: '/', icon: <BiBox /> },
    { title: 'Add Products', path: '/', icon: <BiAddToQueue /> },
    { title: 'Categories', path: '/', icon: <BiCategory /> },
    { title: 'Orders', path: '/', icon: <BiCartAlt /> },
    { title: 'Sellers', path: '/', icon: <BiDollarCircle /> },
];
