import axios from 'axios';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router';
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
        basicPrice: 0,
        promotionInfo: '',
        specifications: '',
        imagePreview: [],
        rams: [],
        memoryStorages: [],
        colors: [],
    };

    const handleOnSubmit = async (values) => {
        const {
            categoryId,
            seriesId,
            name,
            description,
            details,
            basicPrice,
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
        formData.append('basicPrice', basicPrice);
        formData.append('promotionInfo', promotionInfo);
        formData.append('specifications', specifications);
        formData.append('imagePreview', imagePreview);
        formData.append('rams', rams);
        formData.append('memoryStorages', memoryStorages);
        formData.append('colors', colors);
        imagePreview.map((image) => {
            formData.append('Image', image);
        });

        const res = await axios.post(addProductRoute, formData);
        if (res.data) navigate(`/product/${res.data.id}`);
    };

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
                    />
                </Paper>
            </div>
        </Container>
    );
}

export default AddProduct;
