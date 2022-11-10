import classNames from 'classnames/bind';
import img from '~/assets/images/macimg.jpg';
import styles from './Cart.module.scss';
import TableCart from './components/TableCart/index';
import SubTotal from './components/SubTotal/index';

const cx = classNames.bind(styles);

function CartPage() {
    return (
        <div className={cx('container')}>
            <div className={cx('slider')}>
                <img alt="" src={img} />
                <h4>Shopping cart</h4>
            </div>
            <div className={cx('wrapper')}>
                <TableCart/>
                <SubTotal/>
            </div>
        </div>
    );
}

export default CartPage;
