import React, { useState, useEffect, useContext, useRef} from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import "./Search.css"
import HeadlessTippy  from '@tippyjs/react/headless';
import ItemSearch from '../ItemSearch/ItemSearch'
import all_products from '../Assets/all_product'


function Search(){
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const inputRef = useRef();
    const data_product = all_products;

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleChange = (e) => {
      const inputValue = e.target.value;
      if (!inputValue.startsWith(' ')) {
          setSearchValue(inputValue);
          if (inputValue) {
              const filteredResults = data_product.filter(product =>
                  product.name.toLowerCase().includes(inputValue.toLowerCase())
              );
              setSearchResult(filteredResults);
              setShowResult(true);
          } else {
              setSearchResult([]);
              setShowResult(false);
          }
      }
  };

    return (
      <div>
           <HeadlessTippy
                interactive
                placement="bottom"
                visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                    <div className="search-results" tabIndex="-1" {...attrs}>
                        <div>
                        {searchResult.map((item, index) => {
                    return (
                      <div key={index} className="">
                        <ItemSearch 
                            key={index} 
                            id={item.id}
                            name={item.name} 
                            image={item.variants[0].image} 
                            sale={item.sale} 
                            old_price={item.old_price} 
                        />
                      </div>
                    )
                  })}
                        </div>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
            <div className="search">
             <div>
              <form className="form-y"onSubmit={(e) => e.preventDefault()}>
                <input className="input-y"
                  ref={inputRef}
                  value={searchValue}
                  placeholder="Tìm kiếm..."
                  spellCheck={false}
                  onChange={handleChange}
                  onFocus={() => setShowResult(true)}
                /> 
              </form>
            </div>
              <div className="input-btn">
                 <button className = "button-y" type="submit" onMouseDown={(e) => e.preventDefault()}>
                         <FontAwesomeIcon icon={faMagnifyingGlass} height={40}/>    
                 </button>
              </div>
            </div>
           </HeadlessTippy>
           </div>
    );
}

export default Search;