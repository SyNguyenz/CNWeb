import React, { useContext, useState, useMemo } from 'react';
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

    const calculateTotalQuantity = useMemo(() => {
        return selectedProducts.reduce((total, item) => total + item.quantity, 0);
    }, [selectedProducts]);

    const calculateEstimatedDeliveryDate = (days) => {
        const deliveryDate = new Date(orderDate);
        deliveryDate.setDate(deliveryDate.getDate() + days);
        return deliveryDate.toLocaleDateString('vi-VN');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = document.createElement('form');
        form.method = 'POST';
        form.action = '/create_payment_url';

        const amountInput = document.createElement('input');
        amountInput.type = 'hidden';
        amountInput.name = 'amount';
        amountInput.value = calculateTotalPrice;
        form.appendChild(amountInput);

        const languageInput = document.createElement('input');
        languageInput.type = 'hidden';
        languageInput.name = 'language';
        languageInput.value = 'vn';
        form.appendChild(languageInput);

        document.body.appendChild(form);
        form.submit();
    };

    
    return (
        <div className="checkout-container">
            <h1>Thông tin đơn hàng</h1>
            <div className="checkout-page">
                <form onSubmit={handleSubmit}>
                    <h3>Thông tin người nhận hàng:</h3>
                    <div className="receiver-inf">
                        <div className="form-group">
                            <div className='form-group-inf'>
                                <label htmlFor="recipientName">Tên người nhận:</label>
                                <input
                                    type="text"
                                    id="recipientName"
                                    value={recipientName}
                                    onChange={(e) => setRecipientName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group-inf">
                                <label htmlFor="phoneNumber">Số điện thoại người nhận:</label>
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
                                <label htmlFor="address">Địa chỉ nhận hàng:</label>
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
                        <h1>  </h1>
                        {selectedProducts.map((item) => (
                            <div key={item.id} className="checkout-item">
                                <img src={item.selectedVariant.images} alt={item.name} />
                                <div className="checkout-item-details">
                                    <h2>{item.name}</h2>
                                    <p>Màu sắc: {item.selectedVariant?.color || 'N/A'}</p>
                                    <p>Giá: {formatPrice(item.newPrice)}</p>
                                    <p>Số lượng: {item.quantity}</p>
                                    <p>Số tiền: {formatPrice(Number(item.newPrice) * item.quantity)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="date-form">
                            <div className="date-inf">
                               
                                <p>Ngày đặt hàng: {orderDate.toLocaleDateString('vi-VN')} </p>
                            </div>
                            <div className="date-inf">
                                
                                <p>Ngày nhận hàng dự kiến: {calculateEstimatedDeliveryDate(3)} đến {calculateEstimatedDeliveryDate(7)} </p>
                            </div>
                        </div>

                        <div className="checkout-total">
                             <h3>Tổng giá trị đơn hàng: {formatPrice(calculateTotalPrice)} ({calculateTotalQuantity} sản phẩm)</h3>
                        </div>

                    <div className='btn-complete-order-container'>
                         <button type="submit" className="btn-complete-order">Thanh toán</button>
                    </div>
                  
                </form>
                
            </div>
        </div>
    );
};

export default Checkout;
