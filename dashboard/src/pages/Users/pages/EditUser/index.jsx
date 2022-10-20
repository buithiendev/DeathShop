import { Avatar } from '@mui/material';
import axios from 'axios';
import classNames from 'classnames/bind';
import { FastField, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import logo from '~/assets/images/0_0_13.png';
import Button from '~/components/Button';
import InputField from '~/components/CustomField/InputField';
import SelectField from '~/components/CustomField/SelectField';
import SwitchField from '~/components/CustomField/SwitchField';
import HeaderChild from '~/components/HeaderChild';
import HighLight from '~/components/HighLight';
import { getUserByIdRoute } from '~/utils/APIRoutes';
import styles from './EditUser.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../usersSlice';

const cx = classNames.bind(styles);

const rules = [
    { value: 1, label: 'Administrator' },
    { value: 2, label: 'Manager' },
    { value: 3, label: 'Staff' },
];

function EditUser() {
    const dispatch = useDispatch()
    const params = useParams();
    const [currentUser, setCurrentUser] = useState();
    const {loading } = useSelector((state) => state.users)

    useEffect(() => {
        async function asyncUseEffect() {
            const user = await axios.get(`${getUserByIdRoute}/${params.id}`);
            setCurrentUser(user.data);
        }
        asyncUseEffect();
    }, []);

    const initialValues = {
        firstName: currentUser && currentUser.firstName,
        lastName: currentUser && currentUser.lastName,
        email: currentUser && currentUser.email,
        role: currentUser && currentUser.role,
        password: '',
        phone: currentUser && currentUser.phone,
        status: currentUser && currentUser.status,
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Email should be valid and contain @').required('Please enter your email'),
        // .test('CheckEmail', 'Email already in use', async (value) => {
        //     const { data } = await axios.post(checkEmail, { email: value });
        //     if (data.status) return true;
        //     return false;
        // }),
        password: Yup.string(),
        firstName: Yup.string().required('Please enter your first name'),
        lastName: Yup.string().required('Please enter your last name'),
        role: Yup.number().required('Please choose a role').nullable(),
    });

    const handleOnSubmit = (values) => {
        dispatch(updateUser({id: params.id, data: values}))
    };
    return (
        <>
            {currentUser && (
                <div className={cx('container')}>
                    <HeaderChild title="User Profile" />
                    <div className={cx('content__container')}>
                        <div className={cx('group__card-profile')}>
                            <div className={cx('card-profile')}>
                                <div className={cx('quick-view')}>
                                    <Avatar alt="avatar" src={logo} sx={{ width: 110, height: 110 }} />
                                    <h3>{`${currentUser.firstName} ${currentUser.lastName}`}</h3>
                                    <p>Project Manager</p>
                                    <Button outline small style={{fontSize: 12}}>Update Profile Picture</Button>
                                </div>
                                <div className={cx('show-active')}>
                                    {currentUser.status ? (
                                        <HighLight primary small>
                                            Is Active
                                        </HighLight>
                                    ) : (
                                        <HighLight outline small>
                                            Non-Active
                                        </HighLight>
                                    )}
                                </div>
                                <div className={cx('description')}>
                                    <h5>Description</h5>
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem,
                                        commodi soluta qui quae minima obcaecati quod dolorum sint alias, possimus illum
                                        assumenda eligendi cumque?
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={cx('form__update-user')}>
                            <p className={cx('form-title')}>Account details</p>

                            <Formik
                                initialValues={initialValues}
                                onSubmit={handleOnSubmit}
                                validationSchema={validationSchema}
                            >
                                {(formikProps) => {
                                    return (
                                        <Form className={cx('form-wrap')}>
                                            <div style={{ display: 'flex', gap: '1rem' }}>
                                                <FastField
                                                    name="firstName"
                                                    label="First Name"
                                                    required
                                                    component={InputField}
                                                    placeholder="Eg: Death"
                                                />
                                                <FastField
                                                    name="lastName"
                                                    label="Last Name"
                                                    required
                                                    component={InputField}
                                                    placeholder="Eg: Lock"
                                                />
                                            </div>
                                            <FastField
                                                name="email"
                                                component={InputField}
                                                required
                                                label="Email"
                                                placeholder="Eg: deathteam@dev.com"
                                            />

                                            <FastField
                                                name="phone"
                                                label="Phone"
                                                component={InputField}
                                                placeholder="Enter your phone number..."
                                            />
                                            <FastField
                                                name="role"
                                                label="Decentralization"
                                                component={SelectField}
                                                placeholder="Choose a role ..."
                                                options={rules}
                                            />
                                            <FastField
                                                name="password"
                                                type="password"
                                                label="Password"
                                                required
                                                component={InputField}
                                                placeholder="*********"
                                            />
                                            <FastField
                                                name="status"
                                                label="Active status"
                                                defaultChecked={currentUser && currentUser.status}
                                                component={SwitchField}
                                            />
                                            <Button
                                                type="submit"
                                                loader={loading}
                                                primary
                                                style={{ margin: '10px auto', width: '50%' }}
                                            >
                                                Update
                                            </Button>
                                        </Form>
                                    );
                                }}
                            </Formik>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default EditUser;
