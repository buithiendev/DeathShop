import { useState } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import Button from '~/components/Button';
import Container from '~/components/Container';
import HeaderChild from '~/components/HeaderChild';
import Paper from '~/components/Paper';

function MainProduct() {
    const categories =
        useSelector((state) => state.categories.categories) || [];

    const [categorySelect, setCategorySelect] = useState(
        categories && categories[0],
    );

    console.log(categorySelect);

    return (
        <Container>
            <HeaderChild title="Products">
                <Button small outline to="/products/add">
                    → Add Product
                </Button>
            </HeaderChild>
            <Paper>
                {
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        {categories.map((category, index) => {
                            return (
                                <span
                                    key={uuidv4()}
                                    onClick={() => setCategorySelect(category)}
                                >
                                    {category.name}
                                </span>
                            );
                        })}
                    </div>
                }
            </Paper>
            <Paper></Paper>
        </Container>
    );
}

export default MainProduct;
