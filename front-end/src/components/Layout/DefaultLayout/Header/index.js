
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  const [showAccount, setShowAccount] = useState(false);
  const [showAccount2, setShowAccount2] = useState(false);
  const [search, setSearch] = useState("");
  const [menu, setMenu] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const amount = cartItems.reduce((a, b) => a + b.qty, 0);

  const userInfo = null; 
  const handleSignout = () => {
    // Xử lý đăng xuất người dùng
  };

  const SearchProduct = (e) => {
    e.preventDefault();
    // Xử lý tìm kiếm sản phẩm
  };

  return (
    <div className="header">
      <section id="menu">
        <div className="logo">
          <span>
            <Link to="/"> YINN </Link>
          </span>
        </div>
        <div className="search">
          <form onSubmit={(e) => SearchProduct(e)}>
            <input
              type="text"
              name="search"
              placeholder="Tìm kiếm ..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </div>
        <ul className="menu-list" id={menu ? "hidden" : ""}>
          <li className="active">
            <Link to="/"> Danh mục </Link>
          </li>
          {userInfo ? (
            <li onClick={() => setShowAccount2(!showAccount2)}>
              <Link>
                {userInfo.name}
                <span style={{ fontSize: "14px" }}>&#9660;</span>
              </Link>
              {showAccount2 && (
                <div className="menu-drop">
                  {userInfo.isAdmin && <Link to="/admin">Admin</Link>}
                  <Link to="/myOrder">Đơn hàng</Link>
                  <Link onClick={() => handleSignout()}>Đăng xuất</Link>
                </div>
              )}
            </li>
          ) : (
            <li onClick={() => setShowAccount(!showAccount)}>
              <Link>
                Tài khoản
                <span style={{ fontSize: "14px" }}>&#9660;</span>
              </Link>
              {showAccount && (
                <div className="menu-drop">
                  <Link to="/register">Đăng kí</Link>
                  <Link to="/login">Đăng nhập</Link>
                </div>
              )}
            </li>
          )}
          <li className="shop-cart">
            <Link to="/cart" className="shop-cart">
              Giỏ hàng
              <span className="count"> {amount} </span>
            </Link>
          </li>
          
        </ul>
        
        <div className="bar" onClick={() => setMenu(!menu)}>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
      </section>
      <section className="main-menu">
        <span>
          <Link to="/dtdd">
            Điện thoại
          </Link>
        </span>
        <span>
          <Link to="/laptop-ldp">
            Laptop
          </Link>
        </span>
        <span>
          <Link to="/may-tinh-bang">
            Tablet
          </Link>
        </span>
        <span className="has-list">
          <Link to="/phu-kien">
            Phụ kiện
          </Link>
          <div className="navmwg"></div>
        </span>
      </section>
    </div>
    
  );
}

export default Header;



