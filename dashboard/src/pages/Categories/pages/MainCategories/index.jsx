import classNames from 'classnames/bind';
import { FastField, Form, Formik } from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import Button from '~/components/Button';
import Container from '~/components/Container';
import ChooseFileField from '~/components/CustomField/ChooseFileField';
import EditorField from '~/components/CustomField/EditorField';
import InputField from '~/components/CustomField/InputField';
import HeaderChild from '~/components/HeaderChild';
import Paper from '~/components/Paper';
import { addCategory } from '../../categoriesSlice';
import styles from './Categories.module.scss';
import TableCategories from './components/TableCategories';

const cx = classNames.bind(styles);

function MainCategories() {
    const [description, setDescription] = useState('');
    const dispatch = useDispatch();

    const initialValues = {
        name: '',
        description: '',
        imageslide: []
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Please enter the product type name'),
    });

    const handleOnSubmit = (values) => {
        const {name, description, imageslide} = values;
        const formData = new FormData();
        formData.append('name',name);
        formData.append('description',description);
        imageslide.map((image) => {
            formData.append('testImage', image)
        })
        dispatch(addCategory(formData));
    };
    return (
        <Container>
            <HeaderChild title="Categories">
                <Button outline to="/products">
                    → Go to products
                </Button>
            </HeaderChild>
            <div className={cx('content')}>
                <div className={cx('left-content')}>
                    <Paper>
                        <Formik
                            initialValues={initialValues}
                            onSubmit={handleOnSubmit}
                            validationSchema={validationSchema}
                        >
                            {(formikProps) => {
                                return (
                                    <Form className={cx('form-wrap')}>
                                        <FastField
                                            name="name"
                                            component={InputField}
                                            label="Name"
                                            placeholder="Type here"
                                        />

                                        <FastField
                                            name="description"
                                            label="Description"
                                            stateChange={setDescription}
                                            component={EditorField}
                                        />
                                        <FastField
                                            name="imageslide"
                                            component={ChooseFileField}
                                            label="Slide image"
                                            placeholder="Type here"
                                        />

                                        <Button
                                            type="submit"
                                            loader={false}
                                            primary
                                            style={{ margin: '10px auto', width: '50%' }}
                                        >
                                            Create Category
                                        </Button>
                                    </Form>
                                );
                            }}
                        </Formik>
                    </Paper>
                    <Paper style={{ minHeight: 300 }}>
                        <h5 className={cx('preview-title')}>Preview Description</h5>
                        <div dangerouslySetInnerHTML={{ __html: description }} />
                    </Paper>
                </div>
                <div className={cx('categories')}>
                    <TableCategories />
                </div>
            </div>
        </Container>
    );
}

export default MainCategories;
