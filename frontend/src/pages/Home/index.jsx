import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import '~/assets/style.css';
import { getCategories } from '~/utils/categoriesRoute';
import PromotionalSlides from './components/PromotionalSlides';
import SomeProduct from '../../components/SomeProduct';
import styles from './Home.module.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { customer } from '~/utils/customerRoute';
import { setInfoCurrentUser } from '~/app/currentUserSlice';

const cx = classNames.bind(styles);

function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { status } = useSelector((state) => state.currentUser);

    const [categories, setCategories] = useState();

    useEffect(() => {
        (async () => {
            try {
                if (!status) {
                    const { data } = await axios.get(customer);

                    console.log(data)

                    if (data) {
                        dispatch(setInfoCurrentUser(data));
                    }
                }
            } catch (ex) {}
        })();
    }, []);


    useEffect(() => {
        let unsubcribed = false;
        (async () => {
            const res = await axios.get(getCategories);
            if (res.data && !unsubcribed) setCategories(res.data);
        })();

        return () => {
            unsubcribed = true;
        };
    }, []);

    return (
        <div className={cx('container')}>
            <PromotionalSlides />
            <div className={cx('wrapper')}>
                {categories &&
                    categories.map((category, index) => {
                        return <SomeProduct category={category} key={index} />;
                    })}
            </div>
        </div>
    );
}

export default Home;
