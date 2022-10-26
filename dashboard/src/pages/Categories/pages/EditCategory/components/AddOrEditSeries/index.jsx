import axios from 'axios';
import classNames from 'classnames/bind';
import { FastField, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import Button from '~/components/Button';
import ChooseFileField from '~/components/CustomField/ChooseFileField';
import InputField from '~/components/CustomField/InputField';
import HeaderChild from '~/components/HeaderChild';
import Paper from '~/components/Paper';
import SeriesItem from './components/SeriesItem/index';
import styles from './AddOrEditSeries.module.scss';
import { addSeries } from './seriesSlice';

const cx = classNames.bind(styles);

function AddOrEditSeries({ series }) {
    const params = useParams();
    const dispatch = useDispatch();

    const initialValues = {
        name: '',
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Please enter the product type name'),
    });

    const handleOnSubmit = async (values) => {
        const { name } = values;
        const categoryId = params.id;
        dispatch(addSeries({name,categoryId}));
    };

    return (
        <div className={cx('series__container')}>
            
            <Paper>
                <HeaderChild small title="Add/Edit Series" />
                <Formik initialValues={initialValues} onSubmit={handleOnSubmit} validationSchema={validationSchema}>
                    {(formikProps) => {
                        return (
                            <Form className={cx('form-wrap')}>
                                <FastField name="name" component={InputField} label="Name" placeholder="Type here" />
                                <Button
                                    type="submit"
                                    loader={false}
                                    primary
                                    style={{ margin: '10px auto', width: '50%' }}
                                >
                                    Create Series
                                </Button>
                            </Form>
                        );
                    }}
                </Formik>
            </Paper>
            <div className={cx('list-series')}>
                {series &&
                    series.map((value, index) => {
                        return (
                            <SeriesItem
                                nameSeries={value.name}
                                description={value.description}
                                index={index}
                                key={uuidv4()}
                            />
                        );
                    })}
            </div>
        </div>
    );
}

export default AddOrEditSeries;
