import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import Button from '~/components/Button';
import Container from '~/components/Container';
import HeaderChild from '~/components/HeaderChild';
import OrdersTable from './components/OrdersTable';
import styles from './Orders.module.scss';

const cx = classNames.bind(styles);

const filterOrders = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: 'Pending' },
    { value: 'unpaid', label: 'Unpaid' },
    { value: 'comfimred', label: 'Comfimred' },
    { value: 'canceled', label: 'Canceled' },
    { value: 'delivering', label: 'Delivering' },
];

function Orders() {
    const orders = useSelector((state) => state.orders.orders);
    const [filter, setFilter] = useState(filterOrders[0]);
    const [orderAfterFilter, setOrderAffterFilter] = useState(orders);

    useEffect(() => {
        (async () => {
            switch (filter.value) {
                case 'all':
                    setOrderAffterFilter(orders);
                    break;
                case 'pending':
                    const ordersPending = orders.filter(
                        (order) => order.status === 'Pending',
                    );
                    setOrderAffterFilter(ordersPending);
                    break;
                case 'comfimred':
                    const ordersConfirmed = orders.filter(
                        (order) => order.status === 'Payment Confirmed',
                    );
                    setOrderAffterFilter(ordersConfirmed);
                    break;
                case 'canceled':
                    const ordersCaneled = orders.filter(
                        (order) => order.status === 'Order has been cancelled',
                    );
                    setOrderAffterFilter(ordersCaneled);
                    break;
                case 'delivering':
                    const ordersDelivering = orders.filter(
                        (order) => order.status === 'Customer has received',
                    );
                    setOrderAffterFilter(ordersDelivering);
                    break;
                default:
                    setOrderAffterFilter(orders);
                    break;
            }
        })();
    }, [filter]);

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
            <HeaderChild title="Orders">
            </HeaderChild>
            <div className={cx('filters')}>
                <Select
                    className={cx('select')}
                    value={filter}
                    isSearchable={false}
                    onChange={(e) => {
                        setFilter(e);
                    }}
                    options={filterOrders}
                />
            </div>
            <OrdersTable orders={orderAfterFilter} />
        </Container>
    );
}

export default Orders;
