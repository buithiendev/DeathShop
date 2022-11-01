import Button from '~/components/Button';
import Container from '~/components/Container';
import HeaderChild from '~/components/HeaderChild';
import Paper from '~/components/Paper';
import FormProduct from './components/FormProduct';

function AddProduct() {

    const initialValues = {
        name: '',
        description: '',
        imageslide: [],
    };

    const handleOnSubmit = (values) => {

    }

    return (
        <Container>
            <HeaderChild title="Add Product">
                <Button outline to="/products">
                    → Go to products
                </Button>
            </HeaderChild>
            <Paper>
                <FormProduct
                    initialValues={initialValues}
                    handleOnSubmit={handleOnSubmit}
                />
            </Paper>
        </Container>
    );
}

export default AddProduct;
