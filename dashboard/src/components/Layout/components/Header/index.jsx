import { Divider, MenuItem } from '@mui/material';
import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './Header.module.scss';
import UserOptions from './UserOptions';
import avatar from '~/assets/images/0_0_13.png'
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Header() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={cx('header')}>
            <div className={cx('header-wrap')}>
                <div className={cx('header-left')}></div>
                <div className={cx('header-right')}>
                    <UserOptions avatar={avatar}>
                        <Link to="/login" style={{}}><MenuItem> My Profile</MenuItem></Link>
                        <MenuItem> Settings</MenuItem>
                        <Divider />
                        <MenuItem>Logout</MenuItem>
                    </UserOptions>
                </div>
            </div>
        </div>
    );
}

export default Header;
