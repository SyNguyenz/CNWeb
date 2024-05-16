import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import CartContext from '../../components/CartContext/CartContext';
import './Checkout.css';

const Checkout = () => {
    const { cart, selectedItems } = useContext(CartContext);

    const selectedProducts = cart.filter(item => selectedItems.includes(item.id));

    const formatPrice = (price) => {
        return price ? price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : 'N/A';
    };

    const calculateTotalPrice = () => {
        return selectedProducts.reduce((total, item) => {
            return total + (Number(item.newPrice) * item.quantity);
        }, 0);
    };

    return (
        <div className="checkout-page">
            <h1>Thông tin thanh toán</h1>
            <div className="checkout-items">
                {selectedProducts.map((item) => (
                    <div key={item.id} className="checkout-item">
                        <img src={item.images[0]} alt={item.name} />
                        <div className="checkout-item-details">
                            <h2>{item.name}</h2>
                            <p>Màu sắc: {item.selectedVariant.color || 'N/A'}</p>
                            <p>Giá: {formatPrice(Number(item.newPrice))}</p>
                            <p>Số lượng: {item.quantity}</p>
                            <p>Tổng: {formatPrice(Number(item.newPrice) * item.quantity)}</p>
                        </div>
                    </div>
                ))}
                <div className="checkout-total">
                    <h2>Tổng giá trị đơn hàng: {formatPrice(calculateTotalPrice())}</h2>
                </div>
                <Link to="/order">
                    <button className="btn-go-home">Quay lại giỏ hàng</button>
                </Link>
            </div>
        </div>
    );
};

export default Checkout;
