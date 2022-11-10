import classNames from 'classnames/bind';
import { Autoplay, Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import img1 from '~/assets/images/mac1.jpg';
import img2 from '~/assets/images/mac2.jpg';
import img3 from '~/assets/images/ip1.jpg';
import img4 from '~/assets/images/fullmac.jpg';

import styles from './TabSlide.module.scss';

const cx = classNames.bind(styles);

function PromotionalSlides() {
    const slides = [img1, img3, img2, img2, img4, img2, img1];

    return (
        <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
                delay: 4500,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
        >
            {slides.map((slide, index) => {
                return (
                    <SwiperSlide key={index}>
                        <img className={cx('img-slide')} src={slide} alt="" />
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
}

export default PromotionalSlides;
