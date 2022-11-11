// Import Swiper React components
import classNames from 'classnames/bind';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './ImagePreview.module.scss';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import '~/assets/style.css';

// import required modules
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Pagination } from 'swiper';

const cx = classNames.bind(styles);

ImagePreview.propTypes = {
    linksImage: PropTypes.array,
};

ImagePreview.defaultProps = {
    linksImage: [],
};

function ImagePreview({ linksImage }) {
    const [imagePreview, setImagePreview] = useState(
        linksImage.length > 0 ? linksImage[0] : null,
    );

    const handleSelectImage = (index) => {
        setImagePreview(linksImage[index]);
    };

    return (
        <>
            <img className={cx('image-prev')} alt="" src={imagePreview} />
            <Swiper
                slidesPerView={1}
                spaceBetween={10}
                pagination={{
                    clickable: true,
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 50,
                    },
                }}
                modules={[Pagination]}
                className="swiper-product"
            >
                {linksImage &&
                    linksImage.map((link, index) => {
                        return (
                            <SwiperSlide
                                key={index}
                                onClick={() => handleSelectImage(index)}
                            >
                                <img
                                    className={cx('img-item')}
                                    alt=""
                                    src={link}
                                />
                            </SwiperSlide>
                        );
                    })}
            </Swiper>
        </>
    );
}

export default ImagePreview;
