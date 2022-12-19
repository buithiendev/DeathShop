import axios from 'axios';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';
import Button from '~/components/Button';
import Container from '~/components/Container';
import HeaderChild from '~/components/HeaderChild';
import Paper from '~/components/Paper';
import { addProductRoute } from '~/utils/ProductAPIRoutes';
import styles from './AddProduct.module.scss';
import FormProduct from './components/FormProduct';

const cx = classNames.bind(styles);

function AddProduct() {
    const navigate = useNavigate();

    const initialValues = {
        categoryId: '',
        seriesId: '',
        name: '',
        description: '',
        details: '',
        newPrice: 0,
        sticker: '',
        promotionInfo: '',
        specifications: '',
        imagePreview: [],
        rams: '',
        memoryStorages: '',
        colors: [],
    };

    const handleOnSubmit = async (values) => {
        const {
            categoryId,
            seriesId,
            name,
            description,
            details,
            newPrice,
            sticker,
            promotionInfo,
            specifications,
            imagePreview,
            rams,
            memoryStorages,
            colors,
        } = values;

        const formData = new FormData();
        formData.append('categoryId', categoryId);
        formData.append('seriesId', seriesId);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('details', details);
        formData.append('newPrice', newPrice);
        formData.append('sticker', sticker);
        formData.append('promotionInfo', promotionInfo);
        formData.append('specifications', specifications);
        formData.append('imagePreview', imagePreview);
        formData.append('rams', rams);
        formData.append('memoryStorages', memoryStorages);
        formData.append('colors', colors);
        imagePreview.map((image) => {
            formData.append('Image', image);
        });

        console.log(values);

        const res = await axios.post(addProductRoute, formData);
        if (res.data) navigate(`/products/${res.data.id}`);
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Please enter the product type name'),
        categoryId: Yup.string().required('Please select product category'),
        seriesId: Yup.string().required('Please select product series'),
        newPrice: Yup.string().required('Please select product series'),
    });

    return (
        <Container>
            <HeaderChild title="Add Product">
                <Button small outline to="/products/add">
                    → Go to product
                </Button>
            </HeaderChild>
            <div className={cx('content')}>
                <Paper>
                    <FormProduct
                        initialValues={initialValues}
                        handleOnSubmit={handleOnSubmit}
                        validationSchema={validationSchema}
                    />
                </Paper>
            </div>
        </Container>
    );
}

export default AddProduct;
