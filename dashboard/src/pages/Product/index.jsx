import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Paper from '~/components/Paper';
import { getProductByIdName } from '~/utils/ProductAPIRoutes';
import DetailsProduct from './components/DetailsProduct';
import ImagePreview from './components/ImagePreview';
import UpdateVariant from './components/UpdateVariant';
import Variants from './components/Variants/index';
import styles from './Product.module.scss';

const cx = classNames.bind(styles);

function Product() {
    const params = useParams();

    const [product, setProduct] = useState();

    useEffect(() => {
        let unsubcribed = false;
        (async () => {
            if (!unsubcribed) {
                const res = await axios.get(
                    `${getProductByIdName}/${params.id}`,
                );

                if (res.data) setProduct(res.data);
            }
        })();

        return () => {
            unsubcribed = true;
        };
    }, []);

    return (
        <div className={cx('container')}>
            {product && (
                <>
                    <Paper
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <h2>Tên sản phẩm: {product.name}</h2>
                        <h3>
                            Loại sản phẩm:{' '}
                            {product.categoryIdName.toUpperCase()}
                        </h3>
                        <h3>
                            Series sản phẩm:{' '}
                            {product.seriesIdName.toUpperCase()}
                        </h3>
                        {/* <Divider /> */}
                        <div className={cx('details-product')}>
                            <ImagePreview linksImage={product.linksImage} />
                        </div>
                        <Variants
                            style={{ marginTop: 20 }}
                            rams={product.rams}
                            memorys={product.memorys}
                            colors={product.colors}
                        />
                        <DetailsProduct
                            description={product.description}
                            detailsProduct={product.detailsProduct}
                            promotion={product.promotionInfo}
                        />
                    </Paper>
                    {/* <UpdateVariant variants={product.variants}/> */}
                </>
            )}
        </div>
    );
}

export default Product;
