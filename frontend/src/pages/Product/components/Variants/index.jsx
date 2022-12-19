import { Button } from '@mui/material';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useState } from 'react';
import styles from './Variants.module.scss';

const cx = classNames.bind(styles);

Variants.propTypes = {
    rams: PropTypes.string,
    memorys: PropTypes.string,
    colors: PropTypes.array,
};

Variants.defaultProps = {
    rams: [],
    memorys: [],
    colors: [],
};

function Variants({ rams, memorys, colors, basicPrice }) {
    const [colorSelect, setColorSelect] = useState(
        colors.length > 0 && colors[0],
    );
    const handleSelectColor = (index) => {
        setColorSelect(colors[index]);
    };

    const convertToVND = (price) => {
        return price.toLocaleString('vi', {
            style: 'currency',
            currency: 'VND',
        });
    };

    return (
        <div className={cx('variants')}>
            <h4 className={cx('product-price')}>{convertToVND(basicPrice)}</h4>
            {rams && (
                <div className={cx('variants-item')}>
                    <span>Chọn RAM: </span>
                    <div className={cx('list-item')}>
                        {rams && (
                            <Button size="small" variant="contained">
                                {rams}
                            </Button>
                        )}
                    </div>
                </div>
            )}
            {memorys && (
                <div className={cx('variants-item')}>
                    <span>Chọn dung lượng: </span>
                    <div className={cx('list-item')}>
                        {memorys && (
                            <Button size="small" variant="contained">
                                {memorys}
                            </Button>
                        )}
                    </div>
                </div>
            )}
            {colors && (
                <div className={cx('variants-item')}>
                    <span>Chọn màu: </span>
                    <div className={cx('list-item')}>
                        {colors.map((color, index) => {
                            return (
                                <Button
                                    key={index}
                                    size="small"
                                    variant={
                                        color === colorSelect
                                            ? 'contained'
                                            : 'outlined'
                                    }
                                    onClick={() => {
                                        handleSelectColor(index);
                                    }}
                                >
                                    {color}
                                </Button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Variants;
