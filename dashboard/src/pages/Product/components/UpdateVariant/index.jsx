import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './UpdateVariant.module.scss';

const cx = classNames.bind(styles);

const ItemVariant = ({ variant, index, changeVariant, variantsUpdate }) => {
    const { ram, memory, color, price, quantity } = variant;

    const onChangePrice = (e) => {
        changeVariant((prev) => {
            if (prev) {
                return (prev.variants[index].price = e.target.value);
            }
        });
    };

    const onChangeQuantity = (e) => {
        changeVariant((prev) => {
            if (prev) {
                return (prev.variants[index].quantity = e.target.value);
            }
        });
    };

    return (
        <div className={cx('item')}>
            <h4>{`${ram}-${memory}-${color}`}</h4>
            <div>
                <div className={cx('group-input')}>
                    <label htmlFor="price">Giá</label>
                    <input
                        id="price"
                        defaultValue={
                            variantsUpdate
                                ? variantsUpdate.variants[index].price
                                : 0
                        }
                        onChange={onChangePrice}
                    />
                </div>
                <div className={cx('group-input')}>
                    <label htmlFor="price">Số lượng</label>
                    <input
                        id="price"
                        value={
                            variantsUpdate
                                ? variantsUpdate.variants[index].quantity
                                : 0
                        }
                        onChange={onChangeQuantity}
                    />
                </div>
            </div>
        </div>
    );
};

function UpdateVariant({ variants }) {
    const [variantsUpdate, setVariantUpdate] = useState(variants);

    console.log(variantsUpdate);

    return (
        <div className={cx('list-variant')}>
            {variants.variants.map((variant, index) => {
                return (
                    <ItemVariant
                        key={index}
                        variant={variant}
                        index={index}
                        id={variants._id}
                        changeVariant={setVariantUpdate}
                        variantsUpdate={variantsUpdate}
                    />
                );
            })}
        </div>
    );
}

export default UpdateVariant;
