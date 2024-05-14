import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import all_products from '../../components/Assets/all_product';
import Item from '../../components/Item/Item';
import './Category.css'

function Category(props) {
  const {brandName} = useParams();
  const [brandList, setBrandList] = useState([]);
  const [maxIndex, setMaxIndex] = useState(20);
  const { category } = props; 
  const product_category = all_products.filter(product => product.category === category);
  const [products, setProducts] = useState([]);
  const [productBrand, setProductBrand] = useState('');
  
  function getBrandImage(brandName) {
    const product = all_products.find(product => product.brand.name.toLowerCase() === brandName.toLowerCase());
      if (product) {
      return product.brand.image;
    } 
  }
  useEffect(() => {
    const brands = Array.from(new Set(product_category.map(product => product.brand.name)));
    setBrandList(brands);
    if (brandName) {
      const filteredProducts = all_products.filter(item => item.category === props.category && item.brand.name.toLowerCase() === brandName.toLowerCase());
      setProducts(filteredProducts);
      setProductBrand(brandName);
    } else {
      const categoryProducts = all_products.filter(item => item.category === props.category);
      setProducts(categoryProducts);
    }
  }, [brandName, props.category]);
 
  


  return (
    <div className='category-container'>
      <div className="clear"></div>
      <div className="block-filter-brand">
        <div className="filter-brands-title">Chọn theo thương hiệu</div>
        <div className="list-brand">
          {
            brandList ?
            brandList.map((brand, index) => {
              return (
                <Link
                  key={index}
                  to={`/${props.category.toLowerCase()}/${brand.toLowerCase()}`}
                  className='list-brand-item'
                >
                  <img src={getBrandImage(brand)} alt={brand.name} className="brand-img" />
                </Link>
              )
            }) : <></>
          } 
        </div>
      </div>
      <div className="block-filter-indexSort">
        <div className="filter-indexSort-title">
          <p>
            <span>Hiển thị 1-{(maxIndex < products.length) ? maxIndex : products.length}</span> trên tổng số {products.length} sản phẩm
          </p>

        </div>
        <div className="block-products-filter">
          {products.slice(0, Math.min(maxIndex, products.length)).map((product, index) => {
            return (
              <Item 
                key={index}
                id={product.id}
                name={product.name}
                image={product.images[0]}
                sale={product.sale}
                old_price={product.old_price}
              />
            )
          })}
        </div>
        {(maxIndex < products.length) && 
        <div onClick={() => setMaxIndex(prev => prev + 20)} className="category-loadmore">
          Xem thêm {products.length - maxIndex} sản phẩm
        </div>
        }
      </div>
    </div>
  )
}

export default Category;