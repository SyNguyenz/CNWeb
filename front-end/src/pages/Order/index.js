import React, { useContext, useState, useEffect } from 'react';
import CartContext from '../../components/CartContext/CartContext';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping,faCheck, faSquare } from '@fortawesome/free-solid-svg-icons'
import {useNavigate} from'react-router-dom';
import './Order.css';

const Order = () => {
    const { cart, addToCart, removeFromCart, selectedItems, setSelectedItems } = useContext(CartContext);
    
    const navigate = useNavigate();

    const formatPrice = (price) => {
        if (price === null || price === undefined) {
            return 'N/A';
        }
        return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };

    const handleRemoveFromCart = (productId) => {
        removeFromCart({ id: productId });
    };
    useEffect(() => { 
        window.scrollTo(0, 0);  
    });
    const handleQuantityChange = (productId, change) => {
        
        const item = cart.find(item => item.id === productId);
        console.log(item);
        if (item) {
            if (item.quantity + change <= 0) {
                handleRemoveFromCart(productId);
            } else {
                addToCart({ ...item, quantity: change });
            }
        }
    };
    const handleCheckboxChange = (productId) => {
       setSelectedItems(prevSelectedItems => prevSelectedItems.includes(productId)? prevSelectedItems.filter(id =>id !== productId) :[...prevSelectedItems,productId]);
    };

    const handleCheckout = (productId) => {
        const selectProduct = cart.filter(item =>selectedItems.includes(item.id));
        navigate(
            '/checkout/', {state: {selectProduct}}
        );
    };
    const calculateTotalPrice = (item) => {
        const newPriceNumeric = Number(item.newPrice);
        return newPriceNumeric * item.quantity;
    };
    return (
        <div className="cart-page">
            <h1> </h1>
            <h1>Giỏ hàng của bạn</h1>
            <div className='total-product-cart'>
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
                                <div 
                                    className={`checkbox-item-cb ${selectedItems.includes(item.id) ? 'selected' : ''}`} 
                                    onClick={() => handleCheckboxChange(item.id)}
                                >
                                    <FontAwesomeIcon 
                                        icon={faCheck}
                                        className="checkbox-icon"
                                    />
                                </div>

                                <img src={item.selectedVariant.image} alt={item.name} />
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
                        <div className='bottom-order'>
                            
                            <Link to ='/'>
                                <button >Chọn thêm sản phẩm</button>
                            </Link>
                            <button  onClick={handleCheckout}>Tới trang thanh toán</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Order;
