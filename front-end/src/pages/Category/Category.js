import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import all_products from '../../components/Assets/all_product';
import Item from '../../components/Item/Item';
import './Category.css'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs.js';
import decreaseFilt from '../../components/Assets/arrow-down.svg';
import increaseFilt from '../../components/Assets/arrow-up.svg'
import saleFilt from '../../components/Assets/percentage.svg'
import money from '../../components/Assets/money.svg'
import rating from '../../components/Assets/rating.svg'



function Category(props) {
  const [maxIndex, setMaxIndex] = useState(20);
  const { brandName } = useParams();
  const [brandList, setBrandList] = useState([]);
  const [productBrand, setProductBrand] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState(null);
  const [products, setProducts] = useState([]);
  const { category } = props;
  const [priceRangeFilter, setPriceRangeFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const product_category = all_products.filter(product => product.category === category);
  
  useEffect(() => {
    // reset lại filters khi đổi category
    setProductBrand(''); 
    setActiveFilter(null); 
    setPriceRangeFilter(''); 
    setRatingFilter(''); 
    setFilteredProducts([]);
  }, [category, brandName]);
  
  useEffect(() => { 
    window.scrollTo(0, 0);  
  }, [category]);
  
  function getBrandImage(brandName) {
    const product = all_products.find(product => product.brand.name.toLowerCase() === brandName.toLowerCase());
      if (product) {
      return product.brand.image;
    } 
  }
  const handlePriceRangeFilter = (range) => {
    setPriceRangeFilter(range);
  };
  
  const handleRatingFilter = (rating) => {
    setRatingFilter(rating);
  };
  
  const handleBrandFilter = (brand) => {
    setProductBrand(brand);
  };

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  const filterByPriceRange = (minPrice, maxPrice) => {
    setActiveFilter({ min: minPrice, max: maxPrice });
  };

  useEffect(() => {
    const brands = Array.from(new Set(product_category.map(product => product.brand.name)));
    setBrandList(brands);

    let filteredByCategory = all_products.filter(item => item.category === category);
    if (brandName) {
      filteredByCategory = filteredByCategory.filter(item => item.brand.name.toLowerCase() === brandName.toLowerCase());
      setProductBrand(brandName);
    }

    setProducts(filteredByCategory);
  }, [brandName, category]);

  useEffect(() => {
    let filteredProducts = products.filter(product => {
      if (productBrand && product.brand.name.toLowerCase() !== productBrand.toLowerCase()) {
        return false;
      }
      if (activeFilter && activeFilter.min && activeFilter.max) {
        const discountedPrice = product.old_price * (1 - product.sale / 100);
        return discountedPrice >= activeFilter.min && discountedPrice <= activeFilter.max;
      }
      return true;
    });

    if (activeFilter && activeFilter.type === 'sort') {
      switch (activeFilter.value) {
        case 'highToLow':
          filteredProducts.sort((a, b) => b.old_price * (1 - b.sale / 100) - a.old_price * (1 - a.sale / 100));
          break;
        case 'lowToHigh':
          filteredProducts.sort((a, b) => a.old_price * (1 - a.sale / 100) - b.old_price * (1 - b.sale / 100));
          break;
        case 'hotDeals':
          filteredProducts.sort((a, b) => b.sale - a.sale);
          break;
        case 'highRating':
          filteredProducts.sort((a, b) => b.rating - a.rating);
          break;
        default:
          break;
      }
    }

    setFilteredProducts(filteredProducts);
  }, [products, productBrand, activeFilter]);

  const handleSortClick = (sortType) => {
    setActiveFilter({ type: 'sort', value: sortType });
  };

  return (
    <div className='category-container'>
      <Breadcrumbs category={props.category} brand={brandName} />
      <div className="clear"></div>
      <div className="block-filter-brand">
        <div className="filter-brands-title">Chọn theo thương hiệu</div>
        <div className="list-brand">
          {brandList.map((brand, index) => (
            <Link
              key={index}
              to={`/${props.category.toLowerCase()}/${brand.toLowerCase()}`}
              className={`list-brand-item ${brand.toLowerCase() === productBrand.toLowerCase() ? 'active' : ''}`}
              onClick={() => handleBrandFilter(brand)}
            >
              <div className={`brand-img-container ${brand.toLowerCase() === productBrand.toLowerCase() ? 'active-brand-container' : ''}`}>
                <img src={getBrandImage(brand)} alt={brand} className="brand-img" />
              </div>

            </Link>
          ))}
        </div>
      </div>
      <div className="block-filter-sort">
        <div className="filter-sort__title">Sắp xếp theo</div>
        <div className="filter-sort__list-filter">
          <a
            className={`btn-filter button__sort ${activeFilter && activeFilter.value === 'highToLow' ? 'active' : ''}`}
            onClick={() => handleSortClick('highToLow')}
          >
            <div className="filter-icon">
              <img src={decreaseFilt} />
            </div>
            Giá Cao - Thấp
          </a>
          <a
            className={`btn-filter button__sort ${activeFilter && activeFilter.value === 'lowToHigh' ? 'active' : ''}`}
            onClick={() => handleSortClick('lowToHigh')}
          >
            <div className="filter-icon">
              <img src={increaseFilt} />
            </div>
            Giá Thấp - Cao
          </a>
          <a
            className={`btn-filter button__sort ${activeFilter && activeFilter.value === 'hotDeals' ? 'active' : ''}`}
            onClick={() => handleSortClick('hotDeals')}
          >
            <div className="filter-icon">
              <img src={saleFilt} />
            </div>
            Khuyến mãi HOT
          </a>
          <a
            className={`btn-filter button__sort ${activeFilter && activeFilter.value === 'highRating' ? 'active' : ''}`}
            onClick={() => handleSortClick('highRating')}
          >
            <div className="filter-icon">
              <img src={rating} />
            </div>
            Đánh giá cao
          </a>
        </div>
      </div>
      <div className="block-filter-sort">
        <div className="criteria-sort__title">Chọn theo tiêu chí</div>
        <div className="criteria-sort__list-filter">
          <a
            className={`btn-filter button__sort ${activeFilter && activeFilter.min === 1 && activeFilter.max === 5000000 ? 'active' : ''}`}
            onClick={() => filterByPriceRange(1, 5000000)}
          >
            <div className="filter-icon">
              <img src={money} />
            </div>
            Dưới 5 triệu
          </a>
          <a
            className={`btn-filter button__sort ${activeFilter && activeFilter.min === 5000000 && activeFilter.max === 10000000 ? 'active' : ''}`}
            onClick={() => filterByPriceRange(5000000, 10000000)}
          >
            <div className="filter-icon">
              <img src={money} />
            </div>
            5 - 10 triệu
          </a>
          <a
            className={`btn-filter button__sort ${activeFilter && activeFilter.min === 10000000 && activeFilter.max === 20000000 ? 'active' : ''}`}
            onClick={() => filterByPriceRange(10000000, 20000000)}
          >
            <div className="filter-icon">
              <img src={money} />
            </div>
            10 - 20 triệu
          </a>
          <a
            className={`btn-filter button__sort ${activeFilter && activeFilter.min === 20000000 && activeFilter.max === 30000000 ? 'active' : ''}`}
            onClick={() => filterByPriceRange(20000000, 30000000)}
          >
            <div className="filter-icon">
              <img src={money} />
            </div>
            20 - 30 triệu
          </a>
          <a
            className={`btn-filter button__sort ${activeFilter && activeFilter.min === 30000000 && activeFilter.max === 10000000000 ? 'active' : ''}`}
            onClick={() => filterByPriceRange(30000000, 1000000000)}
          >
            <div className="filter-icon">
              <img src={money} />
            </div>
            Trên 30 triệu
          </a>

        </div>
      </div>
            

      <div className="block-filter-indexSort">
        <div className="filter-indexSort-title">
          <p>
            {
              filteredProducts.length > 0 ? (
                <span>
                  Hiển thị 1-{(maxIndex < filteredProducts.length) ? maxIndex : filteredProducts.length} trên tổng số {filteredProducts.length} sản phẩm
                </span>
              ) : (
                <span>Không có sản phẩm nào phù hợp với lựa chọn của bạn</span>
              )
            }
          </p>

        </div>
        <div className="block-products-filter">
          {filteredProducts.slice(0, Math.min(maxIndex, products.length)).map((product, index) => {
            return (
              <Item 
                key={index}
                id={product.id}
                name={product.name}
                image={product.variants[0].image}
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