import { Button } from '@mui/material';
import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';
import CardProduct from '~/components/CardProduct';
import {
    getProductByCateIdName,
    getProductBySeriesId,
} from '~/utils/productsRoute';
import { getSeriesByCateIdName } from '~/utils/seriesRoute';
import { getCategoryByIdName } from './../../utils/categoriesRoute';
import SlideCategory from './components/SlideCategory';
import styles from './Shop.module.scss';

const cx = classNames.bind(styles);

function Shop() {
    const navigate = useNavigate();
    const params = useParams();
    const [seriesSelect, setSeriSelect] = useState('All');
    const [series, setSeries] = useState();
    const [category, setCategory] = useState();
    const [products, setProducts] = useState();
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        setShowMore(false)
    }, [params]);

    useEffect(() => {
        let unsubscribed = false;
        (async () => {
            if (!unsubscribed) {
                const series = await axios.get(
                    `${getSeriesByCateIdName}/${params.id}`,
                );
                const resCategory = await axios.get(
                    `${getCategoryByIdName}/${params.id}`,
                );

                if (resCategory.data) {
                    setCategory(resCategory.data);
                } else {
                    navigate('/not-found');
                }
                if (series.data) setSeries(series.data);
            }
        })();

        return () => {
            unsubscribed = true;
        };
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
                <h2 className={cx('category-name')}>
                    {category && category.name}
                </h2>
                {category && (
                    <SlideCategory
                        linksImage={category.linksImage}
                        className="slide-category"
                    />
                )}
                <div className={cx('list-series')}>
                    <span
                        onClick={() => setSeriSelect('All')}
                        className={cx(
                            'series-item',
                            seriesSelect === 'All' ? 'active' : '',
                        )}
                    >
                        Tất cả
                    </span>
                    {series &&
                        series.map((s, index) => {
                            return (
                                <span
                                    onClick={() => setSeriSelect(s._id)}
                                    className={cx(
                                        'series-item',
                                        seriesSelect === s._id ? 'active' : '',
                                    )}
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
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
                    <p
                        className={cx('description', showMore ? 'show-more': '')}
                        dangerouslySetInnerHTML={{
                            __html: category ? category.description : '',
                        }}
                    ></p>
                    {showMore ? (
                        <Button style={{color: 'var(--secondary-color)'}} onClick={() => setShowMore(false)}>
                            Hide Away <BiChevronUp size={24} />
                        </Button>
                    ) : (
                        <Button style={{color: 'var(--secondary-color)'}} onClick={() => setShowMore(true)}>
                            See More <BiChevronDown size={24} />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Shop;
