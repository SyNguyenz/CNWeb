// UserProfile.js
import React, { useContext, useEffect, useState } from 'react';
import AllApi from "../../api/api";
import { AuthContext } from "../../components/AuthContext/AuthContext";
import './UserProfile.css';

const UserProfile = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await AllApi.getUserInfo();
                setUserInfo(response.data);
            } catch (error) {
                console.error("Failed to fetch user info:", error);
            }
        };

        const fetchOrders = async () => {
            try {
                const response = await AllApi.getUserOrders();
                setOrders(response.data);
            } catch (error) {
                console.error("Failed to fetch orders:", error);
            }
        };

        if (user) {
            fetchUserInfo();
            fetchOrders();
        }
    }, [user]);

    if (!user || !userInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div className="user-profile-container">
            <h1>Thông tin người dùng</h1>
            <div className="user-info">
                <p><strong>Tên người dùng:</strong> {userInfo.userName}</p>
                <p><strong>Mật khẩu:</strong> ******</p> {/* Không hiển thị mật khẩu thực tế */}
                <p><strong>Số điện thoại:</strong> {userInfo.phoneNumber}</p>
                <p><strong>Địa chỉ:</strong> {userInfo.address}</p>
            </div>
            <div className="user-orders">
                <h2>Thông tin đơn hàng</h2>
                {orders.length > 0 ? (
                    orders.map((order, index) => (
                        <div key={index} className="order-item">
                            <p><strong>Mã đơn hàng:</strong> {order.id}</p>
                            <p><strong>Ngày đặt hàng:</strong> {new Date(order.date).toLocaleDateString('vi-VN')}</p>
                            <p><strong>Tổng số tiền:</strong> {order.total}</p>
                            <div className="order-products">
                                <p><strong>Sản phẩm:</strong></p>
                                <ul>
                                    {order.items.map((item, idx) => (
                                        <li key={idx}>{item.name} - Số lượng: {item.quantity}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Bạn chưa có đơn hàng nào.</p>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
