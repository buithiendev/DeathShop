import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { BiCartAlt, BiSearchAlt } from 'react-icons/bi';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header() {
    return (
        <header className={cx('container')}>
            <div className={cx('wrapper')}>
                <div className={cx('logo')}>
                    <span>Death Shop</span>
                </div>
                <nav className={cx('navigation')}>
                    <div className={cx('nav-item')}>
                        <span>IPhone</span>
                    </div>
                    <div className={cx('nav-item')}>
                        <span>Macbook</span>
                    </div>
                    <div className={cx('nav-item')}>
                        <span>IPad</span>
                    </div>
                    <div className={cx('nav-item')}>
                        <span>Watch</span>
                    </div>
                    <div className={cx('nav-item')}>
                        <span>Sound</span>
                    </div>
                    <div className={cx('nav-item')}>
                        <span>Accessory</span>
                    </div>
                    <div className={cx('nav-item')}>
                        <span>Service</span>
                    </div>
                </nav>
                <div className={cx('header-right')}>
                    <IconButton
                        sx={{
                            '&:hover': {
                                backgroundColor: 'var(--primary-color-100)',
                            },
                        }}
                    >
                        <BiSearchAlt color="white" size={20} />
                    </IconButton>
                    <IconButton
                        sx={{
                            '&:hover': {
                                backgroundColor: 'var(--primary-color-100)',
                            },
                        }}
                    >
                        <Badge
                            sx={{
                                fontSize: 20,
                                color: 'white',
                                '& .MuiBadge-badge': {
                                    fontSize: 12,
                                },
                            }}
                            badgeContent={4}
                            color="primary"
                        >
                            <BiCartAlt color="action" />
                        </Badge>
                    </IconButton>
                </div>
            </div>
        </header>
    );
}

export default Header;
