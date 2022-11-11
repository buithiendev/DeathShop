import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CardProduct from '~/components/CardProduct';
import {
    getProductByCateIdName,
    getProductBySeriesId,
} from '~/utils/productsRoute';
import { getSeriesByCateIdName } from '~/utils/seriesRoute';
import { getCategoryByIdName } from './../../utils/categoriesRoute';
import SlideCategory from './components/SlideCategory';
import styles from './Shop.module.scss';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Shop() {
    const navigate = useNavigate();
    const params = useParams();
    const [seriesSelect, setSeriSelect] = useState('All');
    const [series, setSeries] = useState();
    const [category, setCategory] = useState();
    const [products, setProducts] = useState();

    useEffect(() => {
        (async () => {
            const series = await axios.get(
                `${getSeriesByCateIdName}/${params.id}`,
            );
            const category = await axios.get(
                `${getCategoryByIdName}/${params.id}`,
            );
            if (category.data){ setCategory(category.data);} else {
                navigate('/not-found')
            }
            if (series.data) setSeries(series.data);
        })();
    }, [params]);

    useEffect(() => {
        (async () => {
            if (seriesSelect === 'All') {
                const res = await axios.get(
                    `${getProductByCateIdName}/${params.id}`,
                );
                setProducts(res.data);
            } else {
                const res = await axios.get(
                    `${getProductBySeriesId}/${seriesSelect}`,
                );
                setProducts(res.data);
            }
        })();
    }, [seriesSelect, params]);

    return (
        <div className={cx('container')}>
            <div className={cx('wrapper')}>
                {category && <SlideCategory linksImage={category.linksImage}/>}
                <h2 className={cx('category-name')}>
                    {category && category.name}
                </h2>
                <div className={cx('list-series')}>
                    <span
                        onClick={() => setSeriSelect('All')}
                        className={cx('series-item',seriesSelect === 'All' ? 'active' : '')}
                    >
                        Tất cả
                    </span>
                    {series &&
                        series.map((s, index) => {
                            return (
                                <span
                                    onClick={() => setSeriSelect(s._id)}
                                    className={cx('series-item',seriesSelect === s._id ? 'active' : '')}
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
                <p className={cx('description')} dangerouslySetInnerHTML={{__html: category ? category.description: ''}}></p>
            </div>
        </div>
    );
}

export default Shop;
