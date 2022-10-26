import { Button } from '@mui/material';
import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './ChooseFileField.module.scss';

const cx = classNames.bind(styles);

function ChooseFileField(props) {
    const { field, form, label, disabled, required } = props;
    const { name, value } = field;
    const [files, setFiles] = useState(value);

    const handleOnChange = (e) => {
        const files = [];
        for (let file of e.target.files) {
            files.push(file);
        }
        setFiles(files);
        const changeEvent = {
            target: {
                name: name,
                value: files,
            },
        };
        field.onChange(changeEvent);
    };

    return (
        <div className={cx('wrapper')}>
            {label && (
                <label>
                    {required && <span>✻</span>}
                    {label}
                </label>
            )}
            <Button variant="contained" component="label" sx={{ marginLeft: '12px' }}>
                Upload
                <input
                    hidden
                    id={name}
                    name={name}
                    disabled={disabled}
                    accept="image/*"
                    onChange={handleOnChange}
                    multiple
                    type="file"
                />
            </Button>
            <div className={cx('files')}>
                {files &&
                    files.map((file, index) => {
                        return (
                            <span className={cx('file')} key={index}>
                                {file.name}
                            </span>
                        );
                    })}
            </div>
        </div>
    );
}

export default ChooseFileField;
