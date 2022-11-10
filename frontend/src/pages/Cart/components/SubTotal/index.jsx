import { Button } from '@mui/material';
import classNames from 'classnames/bind';
import styles from './SubTotal.module.scss';
const cx = classNames.bind(styles);

function SubTotal() {
    return (
        <div className={cx('sub-total')}>
            <div className={cx('heading')}>
                <span>Subtotal</span>
                <p>$1912</p>
            </div>
            <p className={cx('description')}>Taxes and shipping will calculator in checkout</p>
            <Button variant='contained' size='large' fullWidth color='primary'>Shop continue</Button>
            <Button variant='contained' size='large' fullWidth color='primary'>Check out</Button>
        </div>
    );
}

export default SubTotal;
