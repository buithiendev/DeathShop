import axios from 'axios';
import classNames from 'classnames/bind';
import { FastField, Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import Button from '~/components/Button';
import InputField from '~/components/CustomField/InputField';
import SelectField from '~/components/CustomField/SelectField';
import { dateOption, genderOption, monthOption, yearOption } from '~/constants';
import { changeInfo } from '~/utils/customerRoute';
import styles from '../MyProfile.module.scss';

const cx = classNames.bind(styles);

const FormInfo = () => {
    const { customer } = JSON.parse(localStorage.getItem('infoUser'));
    const initialValues = {
        fullName: customer.fullName || '',
        email: customer.email || '',
        gender: customer.gender || 'Male',
        date: customer.dateOfBirth.date || 1,
        month: customer.dateOfBirth.month || 1,
        year: customer.dateOfBirth.year || 2001,
    };

    const validationSchema = Yup.object().shape({
        fullName: Yup.string().required('Please enter a full name'),
    });

    const handleOnSubmit = async (values) => {
        const myPromise = new Promise((resolve, reject) => {
            axios
                .post(`${changeInfo}/${customer?.email}`, values)
                .then((res) => {
                    setTimeout(() => {
                        localStorage.setItem(
                            'infoUser',
                            JSON.stringify(res.data),
                        );
                        resolve(res.data);
                    }, 3000);
                });
        });

        toast.promise(
            myPromise,
            {
                pending: 'Đang cập nhật thông tin',
                success: 'Cập nhật thông tin thành công',
                error: 'Cập nhật thông tin thất bại',
            },
            {
                position: 'bottom-left',
                autoClose: 3000,
                hideProgressBar: true,
                newestOnTop: false,
                closeOnClick: true,
                rtl: false,
                pauseOnFocusLoss: true,
                draggable: true,
                pauseOnHover: true,
                theme: 'dark',
            },
        );
    };

    return (
        <div className={cx('form-info')}>
            <Formik
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={handleOnSubmit}
            >
                {(formikProps) => {
                    return (
                        <Form
                            style={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '20px',
                            }}
                        >
                            <FastField
                                name="fullName"
                                component={InputField}
                                label="Full Name"
                                placeholder="Bùi Thiện"
                            />
                            <FastField
                                name="gender"
                                label="Gender"
                                component={SelectField}
                                placeholder="Choose a series ..."
                                options={genderOption}
                            />
                            <div className={cx('date-of-birth-group')}>
                                <FastField
                                    name="date"
                                    label="Date"
                                    component={SelectField}
                                    placeholder="Choose a series ..."
                                    options={dateOption}
                                />
                                <FastField
                                    name="month"
                                    label="Month"
                                    component={SelectField}
                                    placeholder="Choose a series ..."
                                    options={monthOption}
                                />
                                <FastField
                                    name="year"
                                    label="Year"
                                    component={SelectField}
                                    placeholder="Choose a series ..."
                                    options={yearOption}
                                />
                            </div>
                            <FastField
                                name="email"
                                disabled
                                component={InputField}
                                label="Email"
                                placeholder="Eg: deathdev@xyz.com"
                            />
                            <Button primary type="submit">
                                Save
                            </Button>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};

export default FormInfo;
