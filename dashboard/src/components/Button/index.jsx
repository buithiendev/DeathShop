import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button(props) {
    const { onClick, onSubmit, type } = props;

    return (
        <button className={cx('btn')} onClick={onClick} onSubmit={onSubmit} type={type}>
            {props.children}
        </button>
    );
}

export default Button;
