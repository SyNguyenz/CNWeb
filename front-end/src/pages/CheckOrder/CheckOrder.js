import React, { useState, useEffect } from 'react';
import AllApi from '../../api/api';
import './CheckOrder.css';

//thiếu image của sản phẩm, css còn lỗi ("chưa mua đơn hàng");
//css còn xấu
const CheckOrder = ({ id }) => {
    const [orders, setOrders] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const user = await AllApi.getUserInfo();
                const response = await AllApi.getOrder(user.data.id);
                console.log('Fetched order data:', response.data);
                setOrders(response.data);
            } catch (err) {
                console.error('Error fetching orders:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!orders || orders.length === 0) {
        return <div>Bạn chưa mua đơn hàng nào.</div>;
    }

    const getOrderStatus = (status) => {
        switch (status) {
            case 0:
                return "Đơn hàng đã được đặt";
            case 1:
                return "Đơn hàng đang vận chuyển";
            case 2:
                return "Đơn hàng đã được giao";
            default:
                return "Trạng thái không xác định";
        }
    };

    return (
        <div className='List-order-container'>
            <h1>Danh sách đơn hàng</h1>
            {orders.map((order) => {
                const totalAmount = order.chiTietDonHangs.reduce((sum, item) => sum + item.total, 0);
                return (
                    <div key={order.id} className="order">
                        <p><strong>Ngày đặt hàng:</strong> {order.ngayDat}</p>
                        <h3>Sản phẩm:</h3>
                        <ul>
                            {order.chiTietDonHangs.map((item) => (
                                <li key={item.id}>
                                    <p><strong>Tên sản phẩm:</strong> {item.variant.hangHoa.tenHangHoa}</p>
                                    <p><strong>Màu sắc:</strong> {item.variant.color}</p>
                                    <p><strong>Số lượng:</strong> {item.variant.quantity}</p>
                                    <p><strong>Giá:</strong> {item.total}</p>
                                </li>
                            ))}
                        </ul>
                        <p><strong>Tổng số tiền:</strong> {totalAmount}</p>
                        <p><strong>Trạng thái:</strong> {getOrderStatus(order.tinhTrangDonHang)}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default CheckOrder;
