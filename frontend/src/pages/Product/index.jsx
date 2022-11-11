import { Button, Divider } from '@mui/material';
import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { FaCartPlus } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductByIdName } from '~/utils/productsRoute';
import DetailsProduct from './components/DetailsProduct/index';
import ImagePreview from './components/ImagePreview';
import PromotionInfo from './components/PromotionInfo/index';
import Variants from './components/Variants';
import styles from './Product.module.scss';

const cx = classNames.bind(styles);

function Product() {
    const navigate = useNavigate();
    const params = useParams();
    const [product, setProduct] = useState();

    useEffect(() => {
        let unsubcribed = false;

        (async () => {
            const resProduct = await axios.get(
                `${getProductByIdName}/${params.id}`,
            );
            if (!resProduct.data) navigate('/not-found');
            if (resProduct.data && !unsubcribed) {
                setProduct(resProduct.data);
            }
        })();

        return () => {
            unsubcribed = true;
        };
    }, []);

    return (
        <div className={cx('container')}>
            {product && (
                <div className={cx('wrapper')}>
                    <div className={cx('view-product')}>
                        <div className={cx('left')}>
                            <ImagePreview linksImage={product.linksImage} />
                        </div>
                        <div className={cx('right')}>
                            <h3 className={cx('product-name')}>
                                {product.name}
                            </h3>
                            <Divider />

                            <Variants
                                basicPrice={product.basicPrice}
                                rams={product.rams}
                                memorys={product.memorys}
                                colors={product.colors}
                            />
                            <div className={cx('buy-btns')}>
                                <Button sx={{ width: 300 }} variant="contained">
                                    Mua Ngay
                                </Button>
                                <Button variant="outlined">
                                    <FaCartPlus style={{ marginRight: 10 }} />{' '}
                                    Thêm vào giỏ hàng
                                </Button>
                            </div>
                            <PromotionInfo
                                promotionInfo={product.promotionInfo}
                            />
                        </div>
                    </div>
                    <DetailsProduct
                        description={product.description}
                        detailsProduct={product.detailsProduct}
                    />
                </div>
            )}
        </div>
    );
}

export default Product;
