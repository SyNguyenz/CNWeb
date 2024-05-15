import React, { useContext } from 'react';
import CartContext from '../../components/CartContext/CartContext';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import './Order.css';

const Order = () => {
    const { cart, addToCart, removeFromCart } = useContext(CartContext);

    const formatPrice = (price) => {
        if (price === null || price === undefined) {
            return 'N/A';
        }
        return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };

    const handleRemoveFromCart = (productId) => {
        removeFromCart({ id: productId });
    };
   
    const handleQuantityChange = (productId, change) => {
        const item = cart.find(item => item.id === productId);
        if (item) {
            if (item.quantity + change <= 0) {
                handleRemoveFromCart(productId);
            } else {
                addToCart({ ...item, quantity: change });
            }
        }
    };

    const calculateTotalPrice = (item) => {
        const newPriceNumeric = Number(item.newPrice);
        return newPriceNumeric * item.quantity;
    };

    return (
        <div className="cart-page">
            <h1>Giỏ hàng của bạn</h1>
            {cart.length === 0 ? (
                <div className='Empty-cart'>
                    <div className="icon-container">
                        <FontAwesomeIcon icon={faCartShopping} flip="horizontal" size="6x" color="red" />
                    </div>
                    <p>Giỏ hàng của bạn trống</p>
                    <Link to="/">
                        <button className="btn-go-home">Tiếp tục mua sắm</button>
                    </Link>
                </div>
            ) : (
                <div className="cart-items">
                    {cart.map((item) => (
                        <div key={item.id} className="cart-item">
                            <img src={item.images[0]} alt={item.name} />
                            <div className="cart-item-details">
                                <h2>{item.name}</h2>
                                <p>Màu sắc: {item.selectedVariant.color || 'N/A'}</p>
                                <p>Giá: {formatPrice(item.newPrice)}</p>

                            </div>
                           
                            <div className="price-details">
                                <div className='quantity-all'>
                                    <div className="quantity-controls">
                                        <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                                        <button>{item.quantity}</button>
                                        <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                                      
                                    </div>
                                    <button className="delete-product" onClick={() => handleRemoveFromCart(item.id)}>Xóa</button>
                                </div>
                               
                                <button className="total-price">Đơn giá: {formatPrice(calculateTotalPrice(item))}</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Order;
