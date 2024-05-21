import React, { useContext, useEffect, useRef, useState } from 'react'
import Item from '../Item/Item'
import './RecommendedProducts.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import all_products from '../Assets/all_product';
function RecommendedProducts({ category, productId }) {
  const relatedProducts = all_products.filter((item) => item.category === category && item.id !== productId).slice(0, 8);
  const [index, setIndex] = useState(0);
  const [offset, setOffset] = useState(0);
  const elementRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);

  useEffect(() => {
    const handleOffset = () => {
      const element = elementRef.current;
      let containerWidth;
      
      if (window.innerWidth > 1200) {
        setOffset(index * 234.8);
        setMaxIndex((relatedProducts.length - 5));
      } 
      else if (window.innerWidth > 990) {
        setOffset(index * (width / 4 + 2.5));
        setMaxIndex((relatedProducts.length - 4));
      }
      else if (window.innerWidth > 717) {
        setOffset(index * (width / 3 + 3.33333));
        setMaxIndex((relatedProducts.length - 3));
      }
      else {
        setOffset(index * (width / 2 + 5));
        setMaxIndex((relatedProducts.length - 2));
      }

      if (element) {
        containerWidth = element.offsetWidth;
        setWidth(containerWidth);
      }
    }  

    handleOffset();

    window.addEventListener('resize', handleOffset);

    return () => window.removeEventListener('resize', handleOffset);
  }, [index, width, relatedProducts.length]);

  useEffect(() => {
    if (index < -maxIndex) {
      if (window.innerWidth > 1200) {
        setIndex((relatedProducts.length > 5) ? (-(relatedProducts.length - 5)) : 0);
      } 
      else if (window.innerWidth > 990) {
        setIndex((relatedProducts.length > 4) ? (-(relatedProducts.length - 4)) : 0);
      }
      else if (window.innerWidth > 717) {
        setIndex((relatedProducts.length > 3) ? (-(relatedProducts.length - 3)) : 0);
      }
      else {
        setIndex((relatedProducts.length > 2) ? (-(relatedProducts.length - 2)) : 0);
      }
    }
  }, [maxIndex, index])

  return (
    <>
      {(relatedProducts.length > 0) && 
        <div className='related-products'>
          <div className="product-list-title">
            <a className='title'>
              <h2>SẢN PHẨM TƯƠNG TỰ</h2>
            </a>
          </div>
          <div className="product-list">
            <div className="product-list-swiper">
              <div className="swiper-container">
                <div 
                  ref={elementRef}
                  className="swiper-wrapper"
                  style={{ 
                    transform: `translateX(${offset}px)`,
                    transitionDuration: '300ms'
                  }}
                >
                  {relatedProducts.map((product, index) => {
                    return (
                      <div key={index} className="swiper-slide">
                        <Item 
                          id={product.id}
                          name={product.name}
                          image={product.variants[0].image}
                          sale={product.sale}
                          old_price={product.old_price}
                          rating={product.rating}
                        />
                      </div>
                    )
                  })}
                </div>
                <div 
                  onClick={() => setIndex(prev => prev + 1)} 
                  className="swiper-button-prev"
                  style={ (index === 0) ? {display: 'none'} : {} }
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </div>
                <div 
                  onClick={() => setIndex(prev => prev - 1)} 
                  className="swiper-button-next"
                  style={ (index <= -maxIndex) ? {display: 'none'} : {} }
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default RecommendedProducts