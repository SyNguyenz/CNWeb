import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import ProductDisplay from '../../components/ProductDisplay/ProductDisplay';
import './Product.css'

import all_products from '../../components/Assets/all_product';
import DescriptionProduct from '../../components/DescriptionProduct/DescriptionProduct';
import CommentAndRating from '../../components/CommentAndRating/CommentAndRating';

function Product() {
  const {productId} = useParams();
  const product = all_products.find((item) => item.id === Number(productId))

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <div className='product'>
{product && <ProductDisplay product={product} />}
<DescriptionProduct product={product} />
<CommentAndRating product={product} />
 
    </div>
  )
}

export default Product 