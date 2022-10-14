import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import Select from 'react-select';
import styles from './SelectField.module.scss';

const cx = classNames.bind(styles);

SelectField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    label: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    options: PropTypes.array,
};

SelectField.defaultProps = {
    options: [],
    label: '',
    placeholder: '',
    disabled: false,
};

function SelectField(props) {
    const { field, form, options, label, placeholder, disabled } = props;
    const { name, value } = field;
    const selectedOption = options.find((option) => option.value === value);
    const { errors, touched } = form;
    const showError = errors[name] && touched[name];

    const handleSelectedOptionChange = (selectedOption) => {
        console.log(selectedOption);
        const selectedValue = selectedOption ? selectedOption.value : selectedOption;

        const changeEvent = {
            target: {
                name: name,
                value: selectedValue,
            },
        };
        field.onChange(changeEvent);
    };

    const customStyles = {
        control: () => ({
            cursor: 'pointer',
            display: 'flex',
            backgroundColor: 'red',
            height: '50px',
            width: '100%',
            borderRadius: '25px',
            backgroundColor: 'var(--gray-color-500)',
            padding: '0 10px 0 30px ',
            fontSize: '1.5rem',
        }),
    };

    return (
        <div className={cx('select-field__group')}>
            {label && <label for={name}>{label}</label>}
            <Select
                styles={customStyles}
                id={name}
                {...field}
                value={selectedOption}
                onChange={handleSelectedOptionChange}
                placeholder={placeholder}
                isDisabled={disabled}
                options={options}
            />
            {showError && <p className={cx('validate__error')}>{errors[name]}</p>}
        </div>
    );
}

export default SelectField;
