import { Routes } from 'react-router-dom';
import { Route } from 'react-router';
import MainProduct from './pages/MainProduct';
import AddProduct from './pages/AddProduct';

function Products() {
    return (<Routes>
        <Route path="/" element={<MainProduct/>}/>
        <Route path="/add" element={<AddProduct/>}/>
    </Routes>);
}

export default Products;