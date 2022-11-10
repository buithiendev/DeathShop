import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import styles from './CardProduct.module.scss';

const cx = classNames.bind(styles);

function CardProduct({ product }) {
    const navigate = useNavigate();
    const { linksImage, name, basicPrice } = product;

    const convertToVND = (price) => {
        return price.toLocaleString('vi', {
            style: 'currency',
            currency: 'VND',
        });
    };

    const handleClickProduct = (productID) => {
        navigate(`/product/${productID}`);
    };

    return (
        <div
            className={cx('container')}
            onClick={() => handleClickProduct(product.id)}
        >
            <div className={cx('stickers')}>New</div>
            <img className={cx('thumb')} src={linksImage[0]} alt="" />
            <div className={cx('info')}>
                <h4 className={cx('product-name')}>{name}</h4>
                <p className={cx('price')}>{convertToVND(basicPrice)}</p>
                <p className={cx('subtitle')}>Mua ngay không cần cọc</p>
            </div>
        </div>
    );
}

export default CardProduct;
