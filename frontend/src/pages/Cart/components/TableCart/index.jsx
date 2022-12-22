import classNames from 'classnames/bind';
import { BiTrash } from 'react-icons/bi';
// import ip14 from '~/assets/images/iphone14.png';
import styles from './TableCart.module.scss';
import IconButton from '@mui/material/IconButton';

const cx = classNames.bind(styles);

function TableCart() {
    const products = [
        // {
        //     img: ip14,
        //     title: 'IPhone 14 256GB',
        //     price: '20.000.000VND',
        //     quantity: 1,
        // },
        // {
        //     img: ip14,
        //     title: 'IPhone 14 256GB',
        //     price: '20.000.000VND',
        //     quantity: 1,
        // },
        // {
        //     img: ip14,
        //     title: 'IPhone 14 256GB',
        //     price: '20.000.000VND',
        //     quantity: 1,
        // },
        // {
        //     img: ip14,
        //     title: 'IPhone 14 256GB',
        //     price: '20.000.000VND',
        //     quantity: 1,
        // },
        // {
        //     img: ip14,
        //     title: 'IPhone 14 256GB',
        //     price: '20.000.000VND',
        //     quantity: 1,
        // },
        // {
        //     img: ip14,
        //     title: 'IPhone 14 256GB',
        //     price: '20.000.000VND',
        //     quantity: 1,
        // },
    ];

    const handleDelete = (id) => {
        // ... handle delete here
    }

    return (
        <table cellSpacing="0" cellPadding="0">
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product,index) => {
                    return <tr className={cx('table-row')} key={index}>
                        <td><img className={cx('img-product')} alt="" src={product.img}/></td>
                        <td>{product.title}</td>
                        <td>{product.price}</td>
                        <td>{product.quantity}</td>
                        <td><IconButton onClick={handleDelete(index)}><BiTrash/></IconButton></td>
                    </tr>
                })}
            </tbody>
        </table>
    );
}

export default TableCart;
