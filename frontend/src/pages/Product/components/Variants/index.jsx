import { Button } from '@mui/material';
import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './Variants.module.scss';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

Variants.propTypes = {
    rams: PropTypes.array,
    memorys: PropTypes.array,
    colors: PropTypes.array,
};

Variants.defaultProps = {
    rams: [],
    memorys: [],
    colors: [],
};


function Variants({ rams, memorys, colors, basicPrice }) {
    const [ramSelect, setRamSelect] = useState(rams.length > 0 && rams[0]);
    const [memorySelect, setMemorySelect] = useState(
        memorys.length > 0 && memorys[0],
    );
    const [colorSelect, setColorSelect] = useState(
        colors.length > 0 && colors[0],
    );

    const handleSelectRam = (index) => {
        setRamSelect(rams[index]);
    };
    const handleSelectMemory = (index) => {
        setMemorySelect(memorys[index]);
    };
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
            <h4 className={cx('product-price')}>
                {convertToVND(basicPrice)}
            </h4>
            {rams && (
                <div className={cx('variants-item')}>
                    <span>Chọn RAM: </span>
                    <div className={cx('list-item')}>
                        {rams.map((ram, index) => {
                            return (
                                <Button
                                    key={index}
                                    size="small"
                                    variant={
                                        ram === ramSelect
                                            ? 'contained'
                                            : 'outlined'
                                    }
                                    onClick={() => {
                                        handleSelectRam(index);
                                    }}
                                >
                                    {ram}
                                </Button>
                            );
                        })}
                    </div>
                </div>
            )}
            {memorys && (
                <div className={cx('variants-item')}>
                    <span>Chọn dung lượng: </span>
                    <div className={cx('list-item')}>
                        {memorys.map((memory, index) => {
                            return (
                                <Button
                                    key={index}
                                    size="small"
                                    variant={
                                        memory === memorySelect
                                            ? 'contained'
                                            : 'outlined'
                                    }
                                    onClick={() => {
                                        handleSelectMemory(index);
                                    }}
                                >
                                    {memory}
                                </Button>
                            );
                        })}
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
