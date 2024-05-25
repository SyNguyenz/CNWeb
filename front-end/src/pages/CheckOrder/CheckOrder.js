import React, { useState, useEffect } from 'react';
import { AllApi } from '../../api/api';
import './CheckOrder.css';

const CheckOrder = ({ id }) => {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await AllApi.getOrder(id);
                console.log('Fetched order data:', response.data);
                setOrder(response.data);
            } catch (err) {
                console.error('Error fetching order:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className='List-order-container'>
            <h1>Danh sách đơn hàng</h1>
            {order && order.length > 0 ? (
                order.map((order) => (
                    <div key={order.id} className="order">
                        <p><strong>Ngày đặt hàng:</strong> {order.orderDate}</p>
                        <h3>Sản phẩm:</h3>
                        <ul>
                            {order.items.map((item) => (
                                <li key={item.id}>
                                    <p><strong>Tên sản phẩm:</strong> {item.productName}</p>
                                    <p><strong>Màu sắc:</strong> {item.color}</p>
                                    <p><strong>Số lượng:</strong> {item.quantity}</p>
                                    <p><strong>Giá:</strong> {item.newprice}</p>
                                </li>
                            ))}
                        </ul>
                        <p><strong>Tổng số tiền:</strong> {order.totalAmount}</p>
                        <p><strong>Trạng thái:</strong> {order.status}</p>
                    </div>
                ))
            ) : (
                <p>Bạn chưa mua đơn hàng nào.</p>
            )}
        </div>
    );
};

export default CheckOrder;
