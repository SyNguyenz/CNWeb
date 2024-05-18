import React, { useContext, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import CartContext from '../../components/CartContext/CartContext';
import './Checkout.css';

const Checkout = () => {
    const { cart, selectedItems } = useContext(CartContext);

    const [recipientName, setRecipientName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const orderDate = new Date(); 

 

    const selectedProducts = useMemo(() => {
        const selectedSet = new Set(selectedItems);
        return cart ? cart.filter(item => selectedSet.has(item.id)) : [];
    }, [cart, selectedItems]);

    const formatPrice = (price) => {
        return price ? price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : 'N/A';
    };

    const calculateTotalPrice = useMemo(() => {
        return selectedProducts.reduce((total, item) => {
            return total + (Number(item.newPrice) * item.quantity);
        }, 0);
    }, [selectedProducts]);

    const calculateEstimatedDeliveryDate = (days) => {
        const deliveryDate = new Date(orderDate);
        deliveryDate.setDate(deliveryDate.getDate() + days);
        return deliveryDate.toLocaleDateString('vi-VN');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Thực hiện hành động khi người dùng nhấn nút "Hoàn tất đơn hàng"
        // Gửi dữ liệu tới server 
        console.log('Recipient Name:', recipientName);
        console.log('Address:', address);
        console.log('Phone Number:', phoneNumber);
        console.log('Order Date:', orderDate.toLocaleDateString('vi-VN'));
    };

    return (
        <div className="checkout-container">
            <h1>Thông tin thanh toán</h1>
            <div className="checkout-page">
                <form onSubmit={handleSubmit}>
                    <h3>Thông tin người nhận hàng:</h3>
                    <div className="receiver-inf">
                        <div className="form-group">
                            <div className="form-group-inf">
                                <label htmlFor="recipientName">Tên người nhận hàng:</label>
                                <input
                                    type="text"
                                    id="recipientName"
                                    value={recipientName}
                                    onChange={(e) => setRecipientName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group-inf">
                                <label htmlFor="phoneNumber">Số điện thoại:</label>
                                <input
                                    type="tel"
                                    id="phoneNumber"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-group-inf-address">
                                <label htmlFor="address">Địa chỉ:</label>
                                <input
                                    type="text"
                                    id="address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                     
                    </div>
                    
                    <h3>Sản phẩm của bạn:</h3>
                    <div className="checkout-items">
                        {selectedProducts.map((item) => (
                            <div key={item.id} className="checkout-item">
                                <img src={item.images[0]} alt={item.name} />
                                <div className="checkout-item-details">
                                    <h2>{item.name}</h2>
                                    <p>Màu sắc: {item.selectedVariant?.color || 'N/A'}</p>
                                    <p>Số lượng: {item.quantity}</p>
                                    <p>Giá: {formatPrice(Number(item.newPrice) * item.quantity)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="form-group">
                            <div className="form-group-inf">
                               
                                <p>Ngày đặt hàng:{orderDate.toLocaleDateString('vi-VN')} </p>
                            </div>
                            <div className="form-group-inf">
                                
                                <p>Ngày nhận hàng dự kiến: {calculateEstimatedDeliveryDate(3)} đến{calculateEstimatedDeliveryDate(7)} </p>
                            </div>
                        </div>

                        <div className="checkout-total">
                             <h3>Tổng giá trị đơn hàng: {formatPrice(calculateTotalPrice)}</h3>
                        </div>
                        
                    <button type="submit" className="btn-complete-order">Thanh toán</button>
                </form>
                <Link to="/order">
                    <button className="btn-go-home">Quay lại giỏ hàng</button>
                </Link>
            </div>
        </div>
    );
};

export default Checkout;
