import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '~/components/Button';
import Container from '~/components/Container';
import HighLight from '~/components/HighLight';
import { updateImei, updateStatusPayment } from '../Orders/ordersSlice';
import HeaderChild from './../../components/HeaderChild/index';
import { updateAllStatus, updateStatus } from './../Orders/ordersSlice';
import styles from './DetailOrder.module.scss';

const cx = classNames.bind(styles);

const statusOrder = [
    { value: 'Pending', label: 'Pending' },
    { value: 'Payment Confirmed', label: 'Payment Confirmed' },
    { value: 'Order has been cancelled', label: 'Order has been cancelled' },
    { value: 'Order sent', label: 'Order sent' },
    { value: 'Customer has received', label: 'Customer has received' },
];

const statusPayment = [
    { value: 'Pending', label: 'Pending' },
    { value: 'Paid', label: 'Paid' },
];

const DetailOrder = () => {
    const orders = useSelector((state) => state.orders.orders) || [];
    const params = useParams();
    const dispatch = useDispatch();
    const order = orders.find((o) => o?._id === params.id);
    const [statusSelect, setStatusSelect] = useState(
        statusOrder.find((s) => s.value === order?.status),
    );
    const [code,setCode] = useState('')
    const [statusPaymentSelect, setStatusPaymentSelect] = useState(
        statusPayment.find((s) => s.value === order?.statusPayment),
    );

    const ProductItem = (p) => {
        const [imei, setImei] = useState('');

        useEffect(() => {
            if (p?.imei) {
                setImei(p?.product?.imei);
            }
        }, []);

        const handleUpdateImei = () => {
            if (imei !== '') {
                dispatch(
                    updateImei({
                        id: order?._id,
                        productId: p?.product._id,
                        imei: imei,
                    }),
                );
            }
        };

        return (
            <div className={cx('product-item')}>
                <div className={cx('info')}>
                    <h4>{p.product.name}</h4>
                    <div className={cx('info-detail')}>
                        {p.product.memorys && (
                            <span>Memory storage: {p.product.memorys}</span>
                        )}
                        {p.product.rams && <span>RAM: {p.product.rams}</span>}
                        {p.product.colorSelect && (
                            <span>
                                Color: {p.product.colorSelect?.nameColor}
                            </span>
                        )}
                        {p.product.imei && (
                            <span>
                                Imei: {p.product.imei || 'imei not updated'}
                            </span>
                        )}
                    </div>
                </div>
                <div className={cx('right')}>
                    <span className={cx('quantity')}>Quantity: 1</span>
                    <input
                        type="text"
                        value={imei}
                        onChange={(e) => setImei(e.target.value)}
                    />
                    <Button
                        style={{ fontWeight: 400 }}
                        primary
                        small
                        onClick={handleUpdateImei}
                    >
                        Update imei
                    </Button>
                </div>
            </div>
        );
    };

    const sendCode = async () => {
        const addData = async () => {
            const response = await axios.post('http://localhost:5000/api/order/sendMail',{code, order});
            return response;
        };

        toast.promise(
            addData,
            {
                pending: 'Đang gửi mail. Vui lòng chờ',
                success: 'Gửi mail tới khách hàng thành công',
                error: 'Gửi mail tới khách hàng thất bại',
            },
            {
                position: 'bottom-left',
                autoClose: 3000,
                hideProgressBar: false,
                newestOnTop: false,
                closeOnClick: true,
                rtl: false,
                pauseOnFocusLoss: true,
                draggable: true,
                pauseOnHover: true,
                theme: 'dark',
            },
        );

    }

    const handleUpdateStatus = () => {
        dispatch(updateStatus({ id: order?._id, status: statusSelect.value }));
    };

    const handleUpdateStatusPayment = () => {
        dispatch(
            updateStatusPayment({
                id: order?._id,
                statusPayment: statusPaymentSelect.value,
            }),
        );
    };

    const handleUpdate = () => {
        dispatch(
            updateAllStatus({
                id: order?._id,
                status: statusSelect.value,
                statusPayment: statusPaymentSelect.value,
            }),
        );
        toast('✅ Update success!', {
            position: 'bottom-left',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
        });
    };

    return (
        <Container
            style={{
                height: '100%',
                margin: '0 40px',
                paddingTop: '24px',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <HeaderChild title="Products">
                <Button small outline to="/orders">
                    → Add Product
                </Button>
            </HeaderChild>
            <div className={cx('wrapper')}>
                <div className={cx('group-info')}>
                    <div className={cx('info-delivery')}>
                        {order?.idInfoReceived === null ? (
                            <>
                                <div className={cx('info-item')}>
                                    <label>Deliver:</label>
                                    <p>{order?.anothorInfo?.name}</p>
                                </div>
                                <div className={cx('info-item')}>
                                    <label>Phone number:</label>
                                    <p>{order?.anothorInfo?.phone}</p>
                                </div>
                                <div className={cx('info-item')}>
                                    <label>Email:</label>
                                    <p>{order?.anothorInfo?.email}</p>
                                </div>
                                <div className={cx('info-item')}>
                                    <label>Address:</label>
                                    <p>{order?.anothorInfo?.address}</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className={cx('info-item')}>
                                    <label>Deliver:</label>
                                    <p>{order?.idInfoReceived?.name}</p>
                                </div>
                                <div className={cx('info-item')}>
                                    <label>Phone number:</label>
                                    <p>{order?.idInfoReceived?.phone}</p>
                                </div>
                                <div className={cx('info-item')}>
                                    <label>Email:</label>
                                    <p>{order?.idInfoReceived?.email}</p>
                                </div>
                                <div className={cx('info-item')}>
                                    <label>Address:</label>
                                    <p>{order?.idInfoReceived?.address}</p>
                                </div>
                                <div className={cx('info-item')}>
                                    <label>Payment method:</label>
                                    <p>{order?.paymentMethod}</p>
                                </div>
                            </>
                        )}
                    </div>
                    <div className={cx('change')}>
                        <div className={cx('status-order')}>
                            <div>
                                <HighLight
                                    small
                                    success={
                                        order?.status !==
                                        'Order has been cancelled'
                                    }
                                    error={
                                        order?.status ===
                                        'Order has been cancelled'
                                    }
                                >
                                    {order?.status}
                                </HighLight>
                                <HighLight small success>
                                    {order?.statusPayment}
                                </HighLight>
                            </div>
                            <div className={cx('flex')}>
                                <label>Status:</label>
                                <Select
                                    className={cx('select')}
                                    value={statusSelect}
                                    isSearchable={false}
                                    onChange={(value) => {
                                        setStatusSelect(value);
                                    }}
                                    options={statusOrder}
                                />
                            </div>
                            <div className={cx('flex')}>
                                <label>Status Payment:</label>
                                <Select
                                    className={cx('select')}
                                    value={statusPaymentSelect}
                                    isSearchable={false}
                                    onChange={(value) => {
                                        setStatusPaymentSelect(value);
                                    }}
                                    options={statusPayment}
                                />
                            </div>
                        </div>
                        <Button primary small onClick={handleUpdate}>
                            Update{' '}
                        </Button>
                    </div>
                    <div className={cx('filters')}>
                        <input
                            className={cx('search')}
                            value={code}
                            type="text"
                            onChange={(e) => setCode(e.target.value)}
                        />
                        <Button small primary onClick={sendCode}>
                            Gửi mã đơn hàng
                        </Button>
                    </div>
                </div>
            </div>
            <div className={cx('info-group')}>
                <label>Products</label>
                {order?.products.map((p, index) => {
                    return <ProductItem key={index} product={p} />;
                })}
            </div>
            <ToastContainer />
        </Container>
    );
};

export default DetailOrder;
