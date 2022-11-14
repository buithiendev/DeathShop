import classNames from 'classnames/bind';
import HighLight from '~/components/HighLight';
import styles from './Variants.module.scss';

const cx = classNames.bind(styles);

function Variants({ rams, memorys, colors, style }) {
    return (
        <div style={style} className={cx('container')}>
            {rams && (
                <div className={cx('variant-item')}>
                    <label>Dung lượng RAM</label>
                    <div className={cx('list-item')}>
                        {rams.map((ram, index) => {
                            return (
                                <HighLight small primary key={index}>
                                    {ram}
                                </HighLight>
                            );
                        })}
                    </div>
                </div>
            )}
            {memorys && (
                <div className={cx('variant-item')}>
                    <label>Dung lượng bộ nhớ</label>
                    <div className={cx('list-item')}>
                        {memorys.map((memory, index) => {
                            return (
                                <>
                                    <HighLight small primary key={index}>
                                        {memory}
                                    </HighLight>
                                </>
                            );
                        })}
                    </div>
                </div>
            )}
            {colors && (
                <div className={cx('variant-item')}>
                    <label>Màu sắc</label>
                    <div className={cx('list-item')}>
                        {colors.map((color, index) => {
                            return (
                                <HighLight small primary key={index}>
                                    {color}
                                </HighLight>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Variants;
