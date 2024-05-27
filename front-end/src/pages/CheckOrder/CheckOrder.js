import React, { useState, useEffect } from 'react';
import AllApi from '../../api/api';
import './CheckOrder.css';

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
        return <div style={{paddingTop: "200px",marginLeft:"600px", marginBottom:"200px",fontSize:"25px"}}>Loading...</div>;
    }

    if (error) {
        return <div style={{paddingTop: "200px",marginLeft:"600px", marginBottom:"200px",fontSize:"25px"}}>Error: {error.message}</div>;
    }

    if (!orders || orders.length === 0) {
       
        return <div style={{paddingTop: "200px",marginLeft:"600px", marginBottom:"200px",fontSize:"25px"}}>Bạn chưa mua đơn hàng nào.</div>;
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
        <div className='list-order-container'>
            <h1>Danh sách đơn hàng</h1>
            {orders.map((order) => {
                const totalAmount = order.chiTietDonHangs.reduce((sum, item) => sum + item.total, 0);
                return (
                    <div key={order.id} className="order">
                        <p><strong>Ngày đặt hàng:</strong> {order.ngayDat}</p>
                        <h3>Sản phẩm:</h3>
                        <ul>
                            {order.chiTietDonHangs.map((item) => (
                                <li key={item.id} className="order-item">
                                    <img src={item.variant.image} alt={item.variant.hangHoa.tenHangHoa} className="product-image" />
                                    <div className="product-details">
                                        <p><strong>Tên sản phẩm:</strong> {item.variant.hangHoa.tenHangHoa}</p>
                                        <p><strong>Màu sắc:</strong> {item.variant.color}</p>
                                        <p><strong>Số lượng:</strong> {item.variant.quantity}</p>
                                        <p><strong>Giá:</strong> {item.total}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        
                        <p><strong>Tổng số tiền:</strong> {totalAmount} ({order.daThanhToan ? "Đã Thanh toán" : "Chưa thanh toán"})</p>
                        <p><strong>Trạng thái:</strong> {getOrderStatus(order.tinhTrangDonHang)}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default CheckOrder;