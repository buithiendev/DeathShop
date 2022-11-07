import { Route } from 'react-router';
import { Routes } from 'react-router-dom';
import AddProduct from './pages/AddProduct';
import MainProduct from './pages/MainProduct';

function Products() {
    return (
        <Routes>
            <Route path="/" element={<MainProduct />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/edit/:id" element={<AddProduct />} />
        </Routes>
    );
}

export default Products;
