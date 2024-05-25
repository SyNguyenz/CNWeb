import React, { useContext, useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom';
import ProductDisplay from '../../components/ProductDisplay/ProductDisplay';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs.js';
import RecommendedProducts from '../../components/RecommendedProducts/RecommendedProducts.js'
import './Product.css'

import all_products from '../../components/Assets/all_product';
import DescriptionProduct from '../../components/DescriptionProduct/DescriptionProduct';
import CommentAndRating from '../../components/CommentAndRating/CommentAndRating';
import LoginPopup from '../../components/LoginPopup/LoginPopup.js';


function Product() {
  const {productId} = useParams();
  const product = all_products.find((item) => item.id === productId)
 const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('user') !== null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupRef = useRef(null);
  const isFirstRender = useRef(true);

  useEffect(() => { 
      window.scrollTo(0, 0);  
  }, [productId]);


  const handleLogin = () => {
    // Xử lý đăng nhập ở đây
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
    setIsPopupOpen(false); // Đóng popup khi đăng nhập thành công
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    // Xử lý sự kiện click ra ngoài 
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        if (isPopupOpen) {
          closePopup();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPopupOpen]);

  return (
    <div className='product-container'>
          <Breadcrumbs product={product} category={product.category} />
          {product && <ProductDisplay product={product} />}
          <DescriptionProduct product={product} />
          <RecommendedProducts category={product.category} productId={product.id} />
          <div ref={popupRef}></div>
          <CommentAndRating onOpenPopup={openPopup} product={product} />
          {isPopupOpen && !isLoggedIn && (
          <div>
          <LoginPopup onLogin={handleLogin} onClose={closePopup} />
        </div>
      )}
    </div>
  )
}

export default Product 