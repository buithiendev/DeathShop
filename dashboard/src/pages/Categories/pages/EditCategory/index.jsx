import axios from 'axios';
import classNames from 'classnames/bind';
import { FastField, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import * as Yup from 'yup';
import Button from '~/components/Button';
import Container from '~/components/Container';
import EditorField from '~/components/CustomField/EditorField';
import InputField from '~/components/CustomField/InputField';
import HeaderChild from '~/components/HeaderChild';
import Paper from '~/components/Paper';
import { getCategoryById } from '~/utils/CategoriesAPIRoutes';
import { getImageByCategoryId } from '~/utils/ImagesAPIRoutes';
import { updateCategory } from '../../categoriesSlice';
import AddOrEditSeries from './components/AddOrEditSeries';
import styles from './EditCategory.module.scss';

const cx = classNames.bind(styles);

function EditCategory() {
    const dispatch = useDispatch();
    const params = useParams();
    const [categoryCurrent, setCategoryCurrent] = useState(null);
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const series = useSelector((state) => state.series.series);

    useEffect(() => {
        (async () => {
            const category = await axios.get(`${getCategoryById}/${params.id}`);
            if (category) setCategoryCurrent(category.data);
            const images = await axios.get(`${getImageByCategoryId}/${category.data._id}`);
            if (images) setImages(images.data);
        })();
    }, []);

    const initialValues = {
        name: (categoryCurrent && categoryCurrent.name) || '',
        description: (categoryCurrent && categoryCurrent.description) || '',
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Please enter the product type name'),
    });

    const handleOnSubmit = (values) => {
        values.id = params.id;
        dispatch(updateCategory(values));
    };

    return (
        <Container>
            <HeaderChild title="Edit Category And Series" />
            <div className={cx('content')}>
                {categoryCurrent && (
                    <div className={cx('left-content')}>
                        <Paper>
                            <HeaderChild small title="Edit Category" />

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
                                            {images && (
                                                <div className={cx('image-slide')}>
                                                    {images.map((image, index) => {
                                                        const base64String = btoa(
                                                            new Uint8Array(image.image.data.data).reduce(function (
                                                                data,
                                                                byte,
                                                            ) {
                                                                return data + String.fromCharCode(byte);
                                                            },
                                                            ''),
                                                        );
                                                        return (
                                                            <img
                                                                key={index}
                                                                alt=""
                                                                src={`data:image/jpg;base64,${base64String}`}
                                                            />
                                                        );
                                                    })}
                                                </div>
                                            )}
                                            <Button
                                                type="submit"
                                                loader={false}
                                                primary
                                                style={{ margin: '10px auto', width: '50%' }}
                                            >
                                                Update Category
                                            </Button>
                                        </Form>
                                    );
                                }}
                            </Formik>
                        </Paper>
                        <Paper style={{ minHeight: 300, maxWidth: '1060px' }}>
                            <h5 className={cx('preview-title')}>Preview Description</h5>
                            <div dangerouslySetInnerHTML={{ __html: description }} />
                        </Paper>
                    </div>
                )}
                <AddOrEditSeries series={series} />
            </div>
        </Container>
    );
}

export default EditCategory;
