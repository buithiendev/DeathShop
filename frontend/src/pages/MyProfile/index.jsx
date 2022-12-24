import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { BiFoodMenu, BiLocationPlus, BiLock, BiUser } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import ChangePassword from './components/ChangePassword';
import FormAddress from './components/FormAddress';
import FormInfo from './components/FormInfo';
import OrderHistory from './components/OrderHistory';
import styles from './MyProfile.module.scss';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

const MyProfile = () => {
    const navList = [
        { icon: <BiUser size={20} />, name: 'Account information' },
        { icon: <BiLocationPlus size={20} />, name: 'Delivery address' },
        { icon: <BiFoodMenu size={20} />, name: 'Order history' },
        { icon: <BiLock size={20} />, name: 'Change password' },
    ];
    const [selectNavigate, setSelectNavigate] = useState('Account information');

    const NavItem = ({ nav }) => {
        return (
            <div
                className={cx(
                    'nav-item',
                    selectNavigate === nav.name ? 'active' : '',
                )}
                onClick={() => setSelectNavigate(nav.name)}
            >
                {nav.icon} <span>{nav.name}</span>
            </div>
        );
    };

    const RenderSwitch = () => {
        switch(selectNavigate) {
            case 'Account information':
                return <FormInfo/>
            case 'Delivery address':
                return <FormAddress/>
            case 'Order history': 
                return <OrderHistory/>
            case 'Change password':
                return <ChangePassword/>
            default:
                return <FormInfo/>
        }
    }

    return (
        <div className={cx('container')}>
            <div className={cx('wrap')}>
                <div className={cx('navigate')}>
                    {navList.map((nav, index) => {
                        return <NavItem key={index} nav={nav} />;
                    })}
                </div>
                <div className={cx('features')}>
                    <RenderSwitch/>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default MyProfile;
