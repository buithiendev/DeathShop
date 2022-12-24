import classNames from 'classnames/bind';
import { BiTrash } from 'react-icons/bi';
// import ip14 from '~/assets/images/iphone14.png';
import IconButton from '@mui/material/IconButton';
import { memo } from 'react';
import styles from './TableCart.module.scss';

const cx = classNames.bind(styles);

function TableCart({ listProduct }) {
    const handleDelete = (id) => {
        // ... handle delete here
    };

    return (
        <table cellSpacing="0" cellPadding="0">
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {listProduct.map((product, index) => {
                    const { linksImage, rams, memorys, name, colorSelect } =
                        product;
                    return (
                        <tr className={cx('table-row')} key={index}>
                            <td>
                                <img
                                    className={cx('img-product')}
                                    alt=""
                                    src={linksImage[0]}
                                />
                            </td>
                            <td>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <h3>{name}</h3>

                                    {colorSelect?.nameColor && (
                                        <span>
                                            Color: {colorSelect?.nameColor}
                                        </span>
                                    )}
                                    {colorSelect?.nameColor && (
                                        <span>Memory: {memorys}</span>
                                    )}
                                    {colorSelect?.nameColor && (
                                        <span>RAM: {rams}</span>
                                    )}
                                </div>
                            </td>
                            <td>{colorSelect?.priceColor}</td>
                            <td>1</td>
                            <td>
                                <IconButton onClick={handleDelete(index)}>
                                    <BiTrash />
                                </IconButton>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default memo(TableCart);
