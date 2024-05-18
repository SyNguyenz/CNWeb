import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import all_products from '../../components/Assets/all_product';
import Item from '../../components/Item/Item';
import './Category.css'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs.js';
import decreaseFilt from '../../components/Assets/arrow-down.svg';
import increaseFilt from '../../components/Assets/arrow-up.svg'
import saleFilt from '../../components/Assets/percentage.svg'


function Category(props) {
  const {brandName} = useParams();
  const [brandList, setBrandList] = useState([]);
  const [productBrand, setProductBrand] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState(null);
  const [products, setProducts] = useState([]);
  const [maxIndex, setMaxIndex] = useState(20);
  const { category } = props; 
  const product_category = all_products.filter(product => product.category === category);


  function getBrandImage(brandName) {
    const product = all_products.find(product => product.brand.name.toLowerCase() === brandName.toLowerCase());
      if (product) {
      return product.brand.image;
    } 
  }
  
  useEffect(() => {
    const brands = Array.from(new Set(product_category.map(product => product.brand.name)));
    setBrandList(brands);

    let initialProducts;
    if (brandName) {
      initialProducts = all_products.filter(item => item.category === props.category && item.brand.name.toLowerCase() === brandName.toLowerCase());
      setProductBrand(brandName);
    } else {
      initialProducts = all_products.filter(item => item.category === props.category);
    }

    setProducts(initialProducts);
    setFilteredProducts(initialProducts);
  }, [brandName, props.category]);

  // Xử lý sắp xếp và lọc sản phẩm
  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    let sortedProducts = [...products]; 
    switch (filter) {
      case 'highToLow':
        sortedProducts.sort((a, b) => (b.old_price * (1 - b.sale/100) - a.old_price * (1 - a.sale/100)));
        break;
      case 'lowToHigh':
        sortedProducts.sort((a, b) => (a.old_price * (1 - a.sale/100) - b.old_price * (1 - b.sale/100)));
        break;
      case 'hotDeals':
        // sản phẩm lọc theo giảm giá nhiều -> ít
        sortedProducts = sortedProducts.sort((a, b) => (b.sale - a.sale));
        break;
      default:
        sortedProducts = [...products]; 
    }

    setFilteredProducts(sortedProducts);
  };


  return (
    <div className='category-container'>
      <Breadcrumbs category={props.category} brand={productBrand} />
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
      <div className="block-filter-sort">
      <div className="filter-sort__title">Sắp xếp theo</div>
      <div className="filter-sort__list-filter">
        <a
          className={`btn-filter button__sort ${activeFilter === 'highToLow' ? 'active' : ''}`}
          onClick={() => handleFilterClick('highToLow')}
        >
          <div className="filter-icon">
            <img src = {decreaseFilt} />
          </div>
          Giá Cao - Thấp
        </a>
        <a
          className={`btn-filter button__sort ${activeFilter === 'lowToHigh' ? 'active' : ''}`}
          onClick={() => handleFilterClick('lowToHigh')}
        >
          <div className="filter-icon">
            <img src = {increaseFilt} />
          </div>
          Giá Thấp - Cao
        </a>
        <a
          className={`btn-filter button__sort ${activeFilter === 'hotDeals' ? 'active' : ''}`}
          onClick={() => handleFilterClick('hotDeals')}
        >
          <div className="filter-icon">
            <img src = {saleFilt} />
          </div>
          Khuyến mãi HOT
        </a>
       </div>

      </div>
      <div className="block-filter-indexSort">
        <div className="filter-indexSort-title">
          <p>
            <span>Hiển thị 1-{(maxIndex < products.length) ? maxIndex : products.length}</span> trên tổng số {products.length} sản phẩm
          </p>

        </div>
        <div className="block-products-filter">
          {filteredProducts.slice(0, Math.min(maxIndex, products.length)).map((product, index) => {
            return (
              <Item 
                key={index}
                id={product.id}
                name={product.name}
                image={product.images[0]}
                sale={product.sale}
                old_price={product.old_price}
                rating={product.rating}
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