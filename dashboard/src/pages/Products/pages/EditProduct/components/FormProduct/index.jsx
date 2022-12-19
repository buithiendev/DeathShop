import 'antd/dist/antd.css';
import classNames from 'classnames/bind';
import { FastField, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { BiXCircle } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import Button from '~/components/Button';
import ColorField from '~/components/CustomField/ColorField';
import DropFileInput from '~/components/CustomField/DropFileInput';
import InputField from '~/components/CustomField/InputField';
import SelectField from '~/components/CustomField/SelectField';
import SelectMultiField from '~/components/CustomField/SelectMultiField';
import { optionsMemory, optionsRam } from '~/constants/optionProduct';
import TabInput from '../TabInput';
import styles from './FormProduct.module.scss';

const cx = classNames.bind(styles);

const optionCategory = [];
const optionSeries = [];

function FormProduct({ initialValues, handleOnSubmit, isUpdate }) {
    const categories = useSelector((state) => state.categories.categories);
    const [load,setLoad] = useState(true);
    const [categoryId, setCategoryId] = useState();
    const series = useSelector((state) => state.series.series);

    useEffect(() => {
        categories.map((category) => {
            optionCategory.push({ value: category._id, label: category.name });
        });
        if (initialValues?.seriesId) {
            series.map((seri) => {
                if (seri.categoryId === initialValues.categoryId) {
                    optionSeries.push({
                        value: seri._id,
                        label: seri.name,
                    });
                }
            });
        }
    }, [categories]);

    useEffect(() => {
        if (categoryId) {
            optionSeries.splice(0, optionSeries.length);
            series.map((seri) => {
                if (seri.categoryId === categoryId.value) {
                    optionSeries.push({
                        value: seri._id,
                        label: seri.name,
                    });
                }
            });
        }
    }, [categoryId]);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Please enter the product type name'),
    });

    console.log(initialValues)

    const imageRemove = (link, formikProps) => {
        const newLinks = formikProps.initialValues.imagePreview.filter(
            (_link) => _link !== link,
        );
        formikProps.initialValues.imagePreview = newLinks;
        setLoad(!load)
    };

    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={handleOnSubmit}
                validationSchema={validationSchema}
            >
                {(formikProps) => {
                    return (
                        <Form className={cx('form-wrap')}>
                            <div style={{ display: 'flex', gap: '3rem' }}>
                                <FastField
                                    name="categoryId"
                                    label="Category"
                                    component={SelectField}
                                    onChange={setCategoryId}
                                    placeholder="Choose a category ..."
                                    options={optionCategory}
                                />
                                <FastField
                                    name="seriesId"
                                    label="Series"
                                    component={SelectField}
                                    placeholder="Choose a series ..."
                                    options={optionSeries}
                                />
                            </div>
                            <FastField
                                name="name"
                                component={InputField}
                                label="Name"
                                placeholder="Iphone 14..."
                            />
                            <FastField
                                name="imagePreview"
                                component={DropFileInput}
                                label="Image Preview"
                                placeholder="Type here"
                            />
                            {initialValues.imagePreview && (
                                <>
                                    <p className={cx('picture-title')}>
                                        Old picture
                                    </p>
                                    <div className={cx('image-slide')}>
                                        {initialValues.imagePreview.map(
                                            (link, index) => {
                                                return (
                                                    <div
                                                        key={uuidv4()}
                                                        className={cx(
                                                            'image-wrap',
                                                        )}
                                                    >
                                                        <img
                                                            src={link}
                                                            alt=""
                                                        />
                                                        <span
                                                            className={cx(
                                                                'delete-image-btn',
                                                            )}
                                                            onClick={() =>
                                                                imageRemove(
                                                                    link,
                                                                    formikProps,
                                                                )
                                                            }
                                                        >
                                                            <BiXCircle />
                                                        </span>
                                                    </div>
                                                );
                                            },
                                        )}
                                    </div>
                                </>
                            )}
                            <FastField
                                name="sticker"
                                component={InputField}
                                label="Sticker"
                                placeholder="Hot Deal..."
                            />
                            <FastField
                                name="oldPrice"
                                component={InputField}
                                label="Old Price"
                                placeholder="32.000.000 VND"
                            />
                            <FastField
                                name="newPrice"
                                component={InputField}
                                label="New Price"
                                placeholder="32.000.000 VND"
                            />
                            <FastField
                                name="rams"
                                component={SelectField}
                                label="RAM"
                                options={optionsRam}
                            />
                            <FastField
                                name="memoryStorages"
                                component={SelectField}
                                label="Memory Storage"
                                options={optionsMemory}
                            />
                            <FastField
                                name="colors"
                                mode="tags"
                                component={ColorField}
                                label="Colors"
                            />
                            <TabInput />
                            <Button
                                type="submit"
                                loader={false}
                                primary
                                style={{
                                    margin: '10px auto',
                                    width: '20%',
                                }}
                            >
                                Update Product
                            </Button>
                        </Form>
                    );
                }}
            </Formik>
        </>
    );
}

export default FormProduct;
