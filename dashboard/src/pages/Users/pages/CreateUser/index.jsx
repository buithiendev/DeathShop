import classNames from 'classnames/bind';
import { FastField, Form, Formik } from 'formik';
import { BiLock, BiMailSend, BiRename, BiUser } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import Button from '~/components/Button';
import InputField from '~/components/CustomField/InputField';
import SelectField from '~/components/CustomField/SelectField';
import styles from './CreateUser.module.scss';

const cx = classNames.bind(styles);


function CreateUser() {
    const initialValues = {
        email: '',
        fullName: '',
        role: null,
        password: '',
    };
    const rules = [{ value: 1, label: 'Tech' }];

    const validationSchema = Yup.object().shape({
        email: Yup.string().email().required('Please enter your email'),
        password: Yup.string().required('Please enter a password'),
        fullName: Yup.string().required('Please enter your full name'),
        role: Yup.number().required('Please choose a role').nullable(),
    });

    const handleOnSubmit = async (values) => {
        console.log('day');
        console.log(values);
    };

    return (
        <div className={cx('form-container')}>
            <header>
                <h2 className={cx('title')}>Create A New User</h2>
                <p className={cx('desc')}>Create a new user and add to this page</p>
            </header>
            <div className={cx('form')}>
                <Formik initialValues={initialValues} onSubmit={handleOnSubmit} validationSchema={validationSchema}>
                    {(formikProps) => {
                        return (
                            <Form>
                                <div className={cx('field-group')}>
                                    <label>Email</label>
                                    <FastField
                                        name="email"
                                        component={InputField}
                                        placeholder="Eg: deathteam@dev.com"
                                        icon={<BiMailSend />}
                                    />
                                </div>
                                <div className={cx('field-group')}>
                                    <label>Full Name</label>
                                    <FastField
                                        name="fullName"
                                        component={InputField}
                                        placeholder="Eg: Cristiano Ronaldo"
                                        icon={<BiRename />}
                                    />
                                </div>
                                <div className={cx('field-group')}>
                                    <label>Role</label>
                                    <FastField
                                        name="role"
                                        component={SelectField}
                                        placeholder="Choose a role ..."
                                        options={rules}
                                        icon={<BiUser />}
                                    />
                                </div>
                                <div className={cx('field-group')}>
                                    <label>Password</label>
                                    <FastField
                                        name="password"
                                        type="password"
                                        component={InputField}
                                        placeholder="*********"
                                        icon={<BiLock />}
                                    />
                                </div>
                                <Button type="submit">Create User</Button>
                            </Form>
                        );
                    }}
                </Formik>
            </div>
            <Link to="/users"> → Go to users</Link>
        </div>
    );
}

export default CreateUser;
