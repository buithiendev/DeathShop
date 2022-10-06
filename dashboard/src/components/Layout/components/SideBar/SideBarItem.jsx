import { Link } from 'react-router-dom';
import styles from './SideBar.module.scss'
import classNames from 'classnames/bind';

const cx = classNames.bind(styles)

function SideBarItem({ title, path, icon, onClick, moreElement }) {
    return (
        <div className={cx('sidebar__item')} onClick={onClick}>
            <Link to={path}>
                <span className={cx('icon')}>{icon}</span>
                <span className={cx("title")}>{title}</span>
                {moreElement && <div className={cx('more-element')}>{moreElement}</div>}
            </Link>
        </div>
    );
}


export default SideBarItem;
