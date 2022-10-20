import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './SideBar.module.scss';

import Switch from '@mui/material/Switch';
import axios from 'axios';
import { BiAnalyse, BiChevronLeft, BiCog, BiLogOut, BiMoon, BiSearch, BiSun } from 'react-icons/bi';
import { useNavigate } from 'react-router';
import { sideBars } from '~/constants';
import { logout } from '~/utils/APIRoutes';
import SideBarItem from './SideBarItem';

const cx = classNames.bind(styles);

function SideBar() {
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(false);
    const [closeSide, setCloseSide] = useState(false);

    const handleOpenSideBarWithBtn = () => {
        if (closeSide) {
            setCloseSide(false);
        }
    };

    const handleLogout = async () => {
        try {
            await axios.post(logout,{},{withCredentials: true});
        } catch (ex) {
            navigate('/login')
        }
    }

    return (
        <div className={cx('sidebar', closeSide ? 'close' : '', darkMode ? 'dark' : '')}>
            <div className={cx('sidebar-top')}>
                <header>
                    <span className={cx('logo')}>
                        <BiAnalyse />
                    </span>
                    <span className={cx('shop-name')}>DeathShop</span>
                    <span
                        className={cx('toggle')}
                        onClick={() => {
                            setCloseSide(!closeSide);
                        }}
                    >
                        <BiChevronLeft />
                    </span>
                </header>
                <div className={cx('input-group')} onClick={handleOpenSideBarWithBtn}>
                    <input type="text" placeholder="Search..." />
                    <BiSearch />
                    <div />
                </div>
                <div className={cx('menu-list')}>
                    {sideBars.map(({ title, path, icon }, index) => {
                        return <SideBarItem key={index} title={title} path={path} icon={icon} />;
                    })}
                </div>
            </div>
            <div className={cx('sidebar-bottom')}>
                <SideBarItem
                    icon={darkMode ? <BiSun /> : <BiMoon />}
                    title={darkMode ? 'Dark' : 'Light'}
                    onClick={() => {
                        setDarkMode((prev) => !prev);
                    }}
                    moreElement={<Switch checked={darkMode} color="secondary" />}
                />
                <SideBarItem title="Settings" path="/settings" icon={<BiCog />} />
                <SideBarItem title="Logout" path="/login" onClick={handleLogout} icon={<BiLogOut />} />
            </div>
        </div>
    );
}

export default SideBar;
