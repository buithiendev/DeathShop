import classNames from 'classnames/bind';
import styles from './SubTotal.module.scss';
import Button from '~/components/Button';
const cx = classNames.bind(styles);

function SubTotal() {
    return (
        <div className={cx('sub-total')}>
            <div className={cx('heading')}>
                <span>Subtotal</span>
                <p>$1912</p>
            </div>
            <p className={cx('description')}>Taxes and shipping will calculator in checkout</p>
            <Button primary color='primary'>Shop continue</Button>
            <Button style={{margin: 0}} primary color='primary'>Check out</Button>
        </div>
    );
}

export default SubTotal;
