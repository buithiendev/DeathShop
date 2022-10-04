import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as Yup from 'yup';
import imgLogin from '~/assets/images/img-01.webp';
import Button from '~/components/Button';
import InputField from '~/components/CustomField/InputField';

Login.propTypes = {
    onSubmit: PropTypes.func,
};

Login.defaultProps = {
    onSubmit: null,
};

function Login(props) {
    const navigate = useNavigate();
    // const formik = useFormik({
    //     initialValues: {
    //         email: '',
    //         password: '',
    //     },
    //     validationSchema: Yup.object({
    //         email: Yup.string().email().required('Valid email is required'),
    //         password: Yup.string().required('Password is required'),
    //     }),
    //     onSubmit: async (values) => {
    //         const { email, password } = values;
    //         const { data } = await axios.post(loginRoute, {
    //             email,
    //             password,
    //         });
    //         if (data.status) {
    //             navigate('/');
    //         }
    //     },
    // });

    const initialValues = {
        email: '',
        password: '',
        onSubmit: null,
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email().required('Please enter your email'),
        password: Yup.string().required('Please enter a password'),
    });

    return (
        <>
            <Container>
                <FormContainer>
                    <div className="form__wrap">
                        <div>
                            <img className="form__login--img" src={imgLogin} alt="" />
                        </div>
                        <div className="form__right">
                            <h1>Member Login</h1>
                            <Formik
                                validationSchema={validationSchema}
                                initialValues={initialValues}
                                onSubmit={(values)=> {
                                    console.log(values)
                                }}
                            >
                                {(formikProps) => {
                                    const { values, errors, touched } = formikProps;

                                    console.log("values: ",values);
                                    console.log("errors: ",errors);

                                    return (
                                        <Form>
                                            <FastField
                                                name="email"
                                                component={InputField}
                                                placeholder="Eg: deathdev@xyz.com"
                                                icon={<FaEnvelope />}
                                            />
                                            <FastField
                                                name="password"
                                                type="password"
                                                component={InputField}
                                                placeholder="Password"
                                                icon={<FaLock />}
                                            />
                                            <Button type="submit">Login</Button>
                                        </Form>
                                    );
                                }}
                            </Formik>
                            <span className="form__forgot">
                                Forgot <Link to="/forgot">Username/Password</Link>
                            </span>
                            <div className="form__contact">
                                <p>Contact Admin: deathops.dev@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </FormContainer>
            </Container>
        </>
    );
}

const Container = styled.div`
    background-image: linear-gradient(
        to right,
        #b8cbb8 0%,
        #b8cbb8 0%,
        #b465da 0%,
        #cf6cc9 33%,
        #ee609c 66%,
        #ee609c 100%
    );
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const FormContainer = styled.div`
    background-color: var(--white-color);
    padding: 177px 130px 33px 95px;
    width: 960px;
    border-radius: 10px;

    .form__wrap {
        display: flex;
        gap: 10rem;
        justify-content: space-between;
    }

    .form__login--img {
        transition: var(--transition);
        &:hover {
            transform: rotate(-10deg) scale(1.1);
        }
    }

    .form__right {
        display: flex;
        flex-direction: column;
        width: 290px;
        align-items: center;

        h1 {
            font-size: 3rem;
            color: #333;
            line-height: 1.2;
            width: 100%;
            padding-bottom: 54px;
            text-align: center;
        }

        .form__forgot {
            padding-top: 12px;
            font-size: 1.3rem;
            color: var(--text-color-500);

            a {
                cursor: pointer;
                text-decoration: none;
                color: #333;
                transition: var(--transition);
            }

            a:hover {
                color: var(--color-success);
            }
        }

        .form__contact {
            padding-top: 136px;
        }

        .form__contact p {
            cursor: pointer;
            font-size: 13px;
            color: var(--text-color-500);

            &:hover {
                color: var(--color-success);
            }
        }
    }
`;

export default Login;
