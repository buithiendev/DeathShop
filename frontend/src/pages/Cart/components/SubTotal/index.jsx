import classNames from 'classnames/bind';
import Button from '~/components/Button';
import styles from './SubTotal.module.scss';
const cx = classNames.bind(styles);

function SubTotal({ listProduct = [] }) {
    const totalPrice = listProduct
        .reduce((total, curr) => {
            return total + curr?.colorSelect?.priceColor * 1;
        }, 0)
        .toLocaleString('vi', { style: 'currency', currency: 'VND' });

    return (
        <div className={cx('sub-total')}>
            <div className={cx('heading')}>
                <span>Subtotal</span>
                <p>{totalPrice}</p>
            </div>
            <p className={cx('description')}>
                Taxes and shipping will calculator in checkout
            </p>
            <Button to="/" primary color="primary">
                Shop continue
            </Button>
            <Button style={{ margin: 0 }} primary color="primary">
                Check out
            </Button>
        </div>
    );
}

export default SubTotal;
