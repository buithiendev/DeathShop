import classNames from 'classnames/bind';
// import img from '~/assets/images/macimg.jpg';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { getProductWithColor } from '~/utils/productsRoute';
import styles from './Cart.module.scss';
import SubTotal from './components/SubTotal/index';
import TableCart from './components/TableCart/index';

const cx = classNames.bind(styles);

function CartPage() {
    const cart = JSON.parse(localStorage.getItem('carts')) || [];
    const [listProduct, setListProduct] = useState([]);

    useEffect(() => {
        (async () => {
            const listPromise = [];
            cart.map((item) => {
                const response = axios
                    .post(`${getProductWithColor}/${item.product}`, {
                        color: item.colorSelected,
                    })
                    .then((res) => res.data);
                listPromise.push(response);
            });

            const listItem = await Promise.all(listPromise);
            setListProduct(listItem);
        })();
    },[]);

    return (
        <div className={cx('container')}>
            <div className={cx('slider')}>
                {/* <img alt="" src={img} /> */}
                <h4>Shopping cart</h4>
            </div>
            <div className={cx('wrapper')}>
                <TableCart listProduct={listProduct}/>
                <SubTotal listProduct={listProduct}/>
            </div>
        </div>
    );
}

export default CartPage;
