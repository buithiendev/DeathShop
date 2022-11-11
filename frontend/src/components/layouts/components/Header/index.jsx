import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { BiCartAlt, BiSearchAlt } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { getCategoriesActive } from '~/utils/categoriesRoute';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header() {
    const [categories, setCategories] = useState();

    useEffect(() => {
        let unsubcribed = false;
        (async () => {
            const res = await axios.get(getCategoriesActive);
            if (res.data && !unsubcribed) setCategories(res.data);
        })();

        return () => {
            unsubcribed = true;
        };
    }, []);

    return (
        <header className={cx('container')}>
            <div className={cx('wrapper')}>
                <Link to="/" className={cx('logo')}>
                    <span>Death Shop</span>
                </Link>
                <nav className={cx('navigation')}>
                    {categories &&
                        categories.map((category, index) => {
                            return (
                                <Link
                                    to={`/shop/${category.id}`}
                                    key={index}
                                    className={cx('nav-item')}
                                >
                                    <span>{category.name}</span>
                                </Link>
                            );
                        })}
                    <Link className={cx('nav-item')}>
                        <span>Accessory</span>
                    </Link>
                    <Link className={cx('nav-item')}>
                        <span>Service</span>
                    </Link>
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
                    <Link to="/cart">
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
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Header;
