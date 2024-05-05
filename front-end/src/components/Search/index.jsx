import React, { useState, useEffect, useContext, useRef} from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import "./Search.css"
import HeadlessTippy  from '@tippyjs/react/headless';
import ItemSearch from '../ItemSearch/ItemSearch'
import data_product from '../Assets/data'

function Search(){
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const inputRef = useRef();

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
      setSearchResult(
        data_product.filter(product =>
          product.name.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
        
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
                            image={item.image} 
                            new_price={item.new_price} 
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
              <form onSubmit={(e) => e.preventDefault()}>
                <input
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
                 <button type="submit" onMouseDown={(e) => e.preventDefault()}>
                         <FontAwesomeIcon icon={faMagnifyingGlass} height={40}/>    
                 </button>
              </div>
            </div>
           </HeadlessTippy>
           </div>
    );
}

export default Search;