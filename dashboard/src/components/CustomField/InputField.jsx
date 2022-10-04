import PropTypes from 'prop-types';
import styled from 'styled-components';

InputField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
};

InputField.defaultProps = {
    type: 'text',
    label: '',
    placeholder: '',
    disabled: false,
};

function InputField(props) {
    const { field, form, type, label, placeholder, disabled, icon } = props;
    const { name } = field;
    const { errors, touched } = form;
    const showError = errors[name] && touched[name];
    console.log(showError)
    return (
        <InputFieldGroup>
            {label && <label for={name}>{label}</label>}
            <section>
                <input
                    id={name}
                    {...field}
                    placeholder={placeholder}
                    type={type}
                    disabled={disabled}
                    className={(disabled ? 'disabled' : '', showError ? 'valid__error' : '')}
                />
                {icon}
            </section>
            {showError && <p className="validate__error">{errors[name]}</p>}
            {/* <section>
                <input
                    type="text"
                    id="email"
                    placeholder="Eg: deathops.dev@xyz.com"
                    className={formik.touched.email && formik.errors.email && 'valid__error'}
                    {...formik.getFieldProps('email')}
                />
                <FaEnvelope />
            </section>
            {formik.touched.email && formik.errors.email && <p className="validate__error">{formik.errors.email}</p>} */}
        </InputFieldGroup>
    );
}

const InputFieldGroup = styled.div`
    width: 100%;
    margin-bottom: 15px;
    position: relative;

    section {
        display: flex;
        align-items: center;
        position: relative;
    }

    input {
        width: 100%;
        color: var(--text-color-500);
        padding: 0 30px 0 68px;
        height: 50px;
        border: 0;
        background-color: var(--gray-color-500);
        border-radius: 25px;
        font-size: 1.5rem;
        line-height: 1.5;
        font-weight: 500;
        transition: var(--transition);
        outline-color: #ccc;
    }

    input.disabled {
        background-color: #e9f5f9;
    }

    input.valid__error {
        border: 1px solid #F17E8B;
    }

    .validate__error {
        position: absolute;
        font-size: 1.1rem;
        right: 20px;
        color: #EB475A;
    }

    /* input:hover input + svg {
        color: red;
    } */

    svg {
        color: var(--text-color-500);
        position: absolute;
        left: 40px;
        font-size: 1.5rem;
    }
`;

export default InputField;
