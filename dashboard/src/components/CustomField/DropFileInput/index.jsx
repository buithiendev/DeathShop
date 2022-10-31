import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useRef, useState, useEffect } from 'react';
import styles from './DropFileInput.module.scss';
import { v4 as uuidv4 } from 'uuid';

import { BiXCircle } from 'react-icons/bi';
import uploadImg from '~/assets/images/cloud-upload-regular-240.png';

const cx = classNames.bind(styles);

const DropFileInput = (props) => {
    const { field, form, label, disabled, required } = props;
    const { name, value } = field;

    const wrapperRef = useRef(null);
    const [fileList, setFileList] = useState([]);
    useEffect(()=>{
        setFileList(value);
    },[value])

    const onDragEnter = () => wrapperRef.current.classList.add('dragover');
    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');
    const onDrop = () => wrapperRef.current.classList.remove('dragover');
    const onFileDrop = (e) => {
        const newFile = e.target.files[0];
        if (newFile) {
            const updatedList = [...fileList, newFile];
            setFileList(updatedList);
            props.onFileChange(updatedList);

            const changeEvent = {
                target: {
                    name: name,
                    value: updatedList,
                },
            };
            field.onChange(changeEvent);
        }
    };

    const fileRemove = (file) => {
        const updatedList = [...fileList];
        updatedList.splice(fileList.indexOf(file), 1);
        setFileList(updatedList);
        props.onFileChange(updatedList);
        const changeEvent = {
            target: {
                name: name,
                value: updatedList,
            },
        };
        field.onChange(changeEvent);
    };

    return (
        <>
            <div
                ref={wrapperRef}
                className={cx('drop-file-input')}
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            >
                <div className={cx('drop-file-input__label')}>
                    <img src={uploadImg} alt="" />
                    <p>Drag & Drop your images here</p>
                </div>
                <input name={name} accept="image/*" type="file" value="" onChange={onFileDrop} disabled={disabled} />
            </div>
            {fileList.length > 0 ? (
                <div className={cx('drop-file-preview')}>
                    <p className={cx('drop-file-preview__title')}>Preview image upload</p>
                    <div className={cx('list-file')}>
                        {fileList.map((item, index) => {
                            const url = URL.createObjectURL(item);
                            return (
                                <div key={uuidv4()} className={cx('drop-file-preview__item')}>
                                    <img src={url} alt="" />
                                    <span
                                        className={cx('drop-file-preview__item__del')}
                                        onClick={() => fileRemove(item)}
                                    >
                                        <BiXCircle />
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : null}
        </>
    );
};

DropFileInput.propTypes = {
    onFileChange: PropTypes.func,
};

DropFileInput.defaultProps = {
    onFileChange: () => {},
};

export default DropFileInput;
