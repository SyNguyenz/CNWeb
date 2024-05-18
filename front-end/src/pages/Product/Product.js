import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import ProductDisplay from '../../components/ProductDisplay/ProductDisplay';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs.js';
import RecommendedProducts from '../../components/RecommendedProducts/RecommendedProducts.js'
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
    <div className='product-container'>
          <Breadcrumbs product={product} category={product.category} />
          {product && <ProductDisplay product={product} />}
          <DescriptionProduct product={product} />
          <RecommendedProducts category={product.category} productId={product.id} />
          <CommentAndRating product={product} />
 
    </div>
  )
}

export default Product 