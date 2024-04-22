
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import debounce from 'lodash/debounce';

import {
  DownOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";


function Header() {
const [showAccount, setShowAccount] = useState(false);
const [showAccount2, setShowAccount2] = useState(false);
const userInfo = null;
const [search, setSearch] = useState('');
const [searchResults, setSearchResults] = useState([]);

//const delayedSearch = debounce(async (query) => {
//  try {
// //   const response = await fetch(`/api/products?search=${query}`);
// //   const data = await response.json();
// //   setSearchResults(data);
//    
//  } catch (error) {
//    console.error('Error searching products:', error);
//  }
//}, 300);
//useEffect(() => {
//  delayedSearch(search);
//  return delayedSearch.cancel;
//}, [search, delayedSearch]);

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearch(value);
    
    const sampleResults = [
      { id: 1, name: 'Product 1' },
      { id: 2, name: 'Product 2' },
      { id: 3, name: 'Product 3' },
      { id: 4, name: 'Product 4' },
      { id: 5, name: 'Product 5' },
      { id: 6, name: 'Product 6' },
      { id: 7, name: 'Product 7' },
      { id: 8, name: 'Product 8' },
      { id: 9, name: 'Product 9' },
      { id: 10, name: 'Product 10' }
    ];

    if (value === '') {
        setSearchResults([]); 
    } else {
        setSearchResults(
          sampleResults.filter(product =>
            product.name.toLowerCase().includes(value.toLowerCase())
          )
        );
    }
};

  return (
    <div className="header">
      <div className="menu">
        <div className="logo">
          <span>
            <Link to="/"> YINN </Link>
          </span>
        </div>
        <div className="menuList">
          <Link to="/"> DANH MỤC </Link>
        </div>
        <div className="menuList">
          <div className="search">
              <form onSubmit={(e) => e.preventDefault()}>
                <input
                  type="text"
                  name="search"
                  placeholder="Tìm kiếm ..."
                  value={search}
                  onChange={handleSearchChange}
                />
              </form>
              <ul className="searchResults">
                {searchResults.map(product => (
                  <li key={product.id}>{product.name}</li>
                ))}
              </ul>
            </div>
        </div>

        <div className="menuList">
          <div className="shopCart">
              <Link to="/cart" className="shopCart">
                <ShoppingCartOutlined
                  style={{ fontSize: "30px" }}
                ></ShoppingCartOutlined>
                <span className="count"> 0 </span>
              </Link>
          </div>
          <div>
            {userInfo ? (
                <div onClick={() => setShowAccount2(!showAccount2)}>
                  <Link>
                    {userInfo.name}
                    <DownOutlined style={{ fontSize: "14px" }} />
                  </Link>
                  {showAccount2 ? (
                    <div className="menuDrop">
                      {userInfo.isAdmin ? <Link to="/admin">Admin</Link> : ""}
                      <Link to="/myOrder">Đơn hàng</Link>
                      <Link onClick>Đăng xuất</Link>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                <div onClick={() => setShowAccount(!showAccount)}>
                  <Link>
                    Tài khoản
                    <DownOutlined style={{ fontSize: "14px" }} />
                  </Link>
    
                  {showAccount ? (
                    <div className="menu-drop">
                      <Link to="register">Đăng kí  </Link>
                      <Link to="login">Đăng nhập</Link>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;


