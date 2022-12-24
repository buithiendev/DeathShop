import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { setInfoCurrentUser } from '~/app/currentUserSlice';
import { customer } from '~/utils/customerRoute';
import CartPage from '../Cart';
import MyProfile from './../MyProfile/index';

const Customer = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { status } = useSelector((state) => state.currentUser);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(customer);
                if (!data) {
                    navigate('/login')
                } else {
                    dispatch(setInfoCurrentUser(data));
                }
            } catch (ex) {}
        })();
    },[]);

    return (
        <Routes>
            <Route path="/cart" element={<CartPage />} />
            <Route path="/my-profile" element={<MyProfile />} />
        </Routes>
    );
};

export default Customer;
