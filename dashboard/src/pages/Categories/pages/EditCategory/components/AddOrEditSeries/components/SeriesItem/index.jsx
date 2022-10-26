import classNames from 'classnames/bind';
import { useState } from 'react';
import { BiBookmarkAltPlus, BiEdit, BiOutline, BiPlusCircle, BiSearch, BiTrash } from 'react-icons/bi';
import Button from '~/components/Button';
import styles from './SeriesItem.module.scss';

const cx = classNames.bind(styles);

function SeriesItem({ nameSeries, description }) {
    const [showDescription, setShowDescription] = useState(true);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('quick-view')}>
                <p className={cx('name')}>
                    <BiBookmarkAltPlus size={15} /> <span>{nameSeries}</span>
                </p>
                <div className={cx('action')}>
                    <Button primary leftIcon={<BiEdit />} smallest />
                    <Button outline leftIcon={<BiTrash />} smallest />
                    <Button primary leftIcon={<BiPlusCircle />} smallest />
                    <Button primary leftIcon={<BiSearch />} smallest />
                </div>
            </div>
            {showDescription && <div dangerouslySetInnerHTML={{ __html: description }} />}
        </div>
    );
}

export default SeriesItem;
