import React, { useContext, useState } from 'react'
import './ProductDisplay.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faChevronLeft, faChevronRight, faStar } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import ProductRating from '../ProductRating/ProductRating';

function ProductDisplay(props) {
    const {product} = props;
    const [index, setIndex] = useState(0);

    const formatPrice = (price) => {
        let priceString = price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        return priceString.replace(/\s/g, '');
    }
    const [selectedVariantIndex, setSelectedVariantIndex] = useState(0); 
  
    const handleVariantClick = (index) => {
      setSelectedVariantIndex(index); 
      setIndex(index); 
    };
    

  return (
    <div className='productdisplay'>
        <div className="box-product-detail">
            <div className="box-product-detail__left">
                <div className="box-header">
                    <div className="box-product-name">
                        <h1>{product.name}</h1>
                    </div>
                    <div className="box-rating">
                        <ProductRating rating = {product.rating}/>
                        &nbsp;100 đánh giá
                    </div>
            </div>
              
                <div className="box-gallery">
                    <div className="gallery-slide swiper-container">
                        <div 
                            className="swiper-wrapper"
                            style={{
                                transform: `translateX(${-index * 100}%)`,
                                transitionDuration: '300ms'
                            }}
                        >
                            {product.images.map((image, index) => {
                                return (
                                    <div key={index} className="swiper-slide gallery-img">
                                        <img src={image} alt="" />
                                    </div>
                                )
                            })}
                        </div>
                        <div 
                            className="swiper-button-prev"
                            onClick={() => setIndex(prev => prev - 1)}
                            style={ (index === 0) ? {display: 'none'} : {} }
                        >
                            <div className="icon">
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </div>
                        </div>
                        <div 
                            className="swiper-button-next"
                            onClick={() => setIndex(prev => prev + 1)}
                            style={ (index === product.images.length - 1) ? {display: 'none'} : {} }
                        >
                            <div className="icon">
                                <FontAwesomeIcon icon={faChevronRight} />
                            </div>
                        </div>
                    </div>
                    <div className="thumbnail-slide swiper-container">
                        <div className="swiper-wrapper">
                            {product.images.map((image, i) => {
                                return (
                                    <div 
                                        key={i} 
                                        className={`swiper-slide thumb-img ${index === i ? 'swiper-slide-thumb-active' : ''}`}
                                        onClick={() => setIndex(i)}
                                    >
                                        <img src={image} width={'58'} height={'58'} alt="" />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className="box-product-detail__right">
                 <div className="box-price1">
      <p className="item-price-new">{formatPrice(product.variants[selectedVariantIndex].price)}</p>
      <p className="item-price-old">{formatPrice(product.old_price)}</p>
      <div className="item-price-percent">
        <p className="item-rice-percent-detail">
          Giảm &nbsp;
          {((product.old_price - product.variants[selectedVariantIndex].price) / product.old_price * 100).toFixed(0)}%
        </p>
      </div>
            </div>
                <div className="box-product-variants">
                    <div className="box-title">
                        <p>Chọn màu sắc để xem giá chi tiết</p>
                    </div>
                    <div className="box-content">
                     <ul className="list-variants">
                       {product.variants.map((variant, index) => (
                         <li key={index} className={`item-variant ${index === selectedVariantIndex ? 'selected' : ''}`}>
                           <a
                             title={variant.color}
                             className="change-color-btn"
                             onClick={() => handleVariantClick(index)}
                           >
                             <img src={product.images[index]} alt={`${product.name} ${variant.memory} | Chính hãng VN/A`} />
                             <div>
                               <strong className="item-variant-name">{variant.color}</strong>
                               <span>{formatPrice(variant.price)}</span>
                             </div>
                           </a>
                         </li>
                     ))}
                   </ul>
                    </div>
                </div>
                <div className="box-order-btn">
                    <button onClick className="order-btn">
                        <Link to='/cart'>
                            <strong>MUA NGAY</strong>
                            <span>(Thanh toán khi nhận hàng hoặc nhận tại cửa hàng)</span>
                        </Link>
                    </button>
                    <button onClick className="add-to-cart-btn">
                        <FontAwesomeIcon icon={faCartPlus} />
                        <span>Thêm vào giỏ</span>
                    </button>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default ProductDisplay