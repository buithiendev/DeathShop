import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CardProduct from '~/components/CardProduct';
import {
    getProductByIdName,
    getProductBySeriesId,
} from '~/utils/productsRoute';
import { getSeriesByCateIdName } from '~/utils/seriesRoute';
import styles from './Shop.module.scss';

const cx = classNames.bind(styles);

function Shop() {
    const params = useParams();
    const [seriesSelect, setSeriSelect] = useState('All');
    const [series, setSeries] = useState();
    const [products, setProducts] = useState();

    useEffect(() => {
        (async () => {
            const res = await axios.get(
                `${getSeriesByCateIdName}/${params.id}`,
            );

            if (res.data) setSeries(res.data);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            if (seriesSelect === 'All') {
                const res = await axios.get(
                    `${getProductByIdName}/${params.id}`,
                );

                setProducts(res.data);
            } else {
                const res = await axios.get(
                    `${getProductBySeriesId}/${seriesSelect}`,
                );

                setProducts(res.data);
            }
        })();
    }, [seriesSelect]);

    return (
        <div className={cx('container')}>
            <div className={cx('wrapper')}>
                <div className={cx('list-series')}>
                    <span
                        onClick={() => setSeriSelect('All')}
                        className={cx('series-item')}
                    >
                        Tất cả
                    </span>
                    {series &&
                        series.map((s, index) => {
                            return (
                                <span
                                    onClick={() => setSeriSelect(s._id)}
                                    className={cx('series-item')}
                                    key={index}
                                >
                                    {s.name}
                                </span>
                            );
                        })}
                </div>
                <div className={cx('list-product')}>
                    {products &&
                        products.map((product, index) => {
                            return (
                                <CardProduct product={product} key={index} />
                            );
                        })}
                </div>
            </div>
        </div>
    );
}

export default Shop;
