import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import ProductDisplay from '../../components/ProductDisplay/ProductDisplay';


import data_product from '../../components/Assets/data';
import DescriptionProduct from '../../components/DescriptionProduct/DescriptionProduct';

function Product() {
  const {productId} = useParams();
  const product = data_product.find((item) => item.id === Number(productId))

  return (
    <div className='product'>
{product && <ProductDisplay product={product} />}
<DescriptionProduct product={product} />
 
    </div>
  )
}

export default Product 