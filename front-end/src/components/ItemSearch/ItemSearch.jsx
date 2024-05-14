import React from 'react'
import { Link } from 'react-router-dom'
import './ItemSearch.css'


function ItemSearch(props) {
  const formatPrice = (price) => {
    let priceString = price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    return priceString.replace(/\s/g, '');
  }
  const discountPrice = props.old_price * (1 - props.sale/100);
  return (
    <div className='item1'>
      <div className="item-info">
        <Link to={`/Product/${props.id}`}>
          <div className="item-image">
            <img src={props.image} alt={props.name} />
          </div>
          <div className="item-name">
            <h3>{props.name}</h3>
          </div>
          <div className="box-price">
            <p className="item-price-new">{formatPrice(discountPrice)}</p>
            <p className="item-price-old">{formatPrice(props.old_price)}</p>   
          </div>
        </Link>
      </div>
    </div>
  )
}

export default ItemSearch;