import classNames from 'classnames/bind';
import styles from './HeaderChild.module.scss';

const cx = classNames.bind(styles);

function HeaderChild({ children, title }) {
    return (
        <div className={cx('header')}>
            <span className={cx('title')}>{title}</span>
            <div className={cx('feature')}>{children}</div>
        </div>
    );
}

export default HeaderChild;
