import React, { useContext, useState, useMemo } from 'react';
import CartContext from '../../components/CartContext/CartContext';
import './Checkout.css';
import AllApi from '../../api/api'

const Checkout = () => {
    const { cart, selectedItems } = useContext(CartContext);
    const [recipientName, setRecipientName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isPaymentOptionsVisible, setIsPaymentOptionsVisible] = useState(false);
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
    const handlePaymentClick = () => {
        setIsPaymentOptionsVisible(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        var ids = [];
        var numbers = [];
        
        selectedProducts.forEach((item) => {
            ids.push(item.selectedVariant.id);
            numbers.push(item.quantity);
        });
        
        console.log(calculateTotalPrice);
        try{
            const orderInfo = await AllApi.addOrder(ids, numbers);
            const response = await AllApi.checkout(calculateTotalPrice, recipientName + " mua hang", orderInfo.data.maDonHang);
            window.location.href = response.data;
        }
        catch(error){
            console.log(error)
        }
    };

    const handleCODPayment = async (e) => {
        e.preventDefault();
        var ids = [];
        var numbers = [];
        
        selectedProducts.forEach((item) => {
            ids.push(item.selectedVariant.id);
            numbers.push(item.quantity);
        });
        try{
            await AllApi.addOrder(ids, numbers);
        } 
        catch(error){
            console.log(error);
        }
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
                        {selectedProducts.map((item) => (
                            <div key={item.id} className="checkout-item">
                                <img src={item.selectedVariant.image} alt={item.name} />
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
                            <p>Ngày đặt hàng: {orderDate.toLocaleDateString('vi-VN')}</p>
                        </div>
                        <div className="date-inf">
                            <p>Ngày nhận hàng dự kiến: {calculateEstimatedDeliveryDate(3)} đến {calculateEstimatedDeliveryDate(7)}</p>
                        </div>
                    </div>

                    <div className="checkout-total">
                        <h3>Tổng giá trị đơn hàng: {formatPrice(calculateTotalPrice)} ({calculateTotalQuantity} sản phẩm)</h3>
                    </div>

                    <div className='btn-complete-order-container'>
                        {!isPaymentOptionsVisible ? (
                                <button type="button" className="btn-complete-payment" onClick={handlePaymentClick}>
                                    Thanh toán
                                </button>
                            ) : (
                                <>
                                    <div className='payment-choice'>
                                        <button type="button" className="btn-complete-order" onClick={handleCODPayment}>
                                            Thanh toán khi nhận hàng
                                        </button>
                                        <button type="submit" className="btn-complete-order">
                                            Thanh toán online
                                        </button>
                                    </div>
                                   
                                </>
                            )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Checkout;