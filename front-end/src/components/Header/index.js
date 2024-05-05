import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from '../Assets/logo.jpg'
import Search from "../Search";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBagShopping, faCircleUser, faList, faPhoneVolume, faTruckField } from '@fortawesome/free-solid-svg-icons'
import HeadlessTippy  from '@tippyjs/react/headless';


function Header() {
const [isMenu, setIsMenu] = useState(false);
const [showAccount, setShowAccount] = useState(false);
const [showAccount2, setShowAccount2] = useState(false);
const userInfo = null;

  return (
    <div className="header">
      <div className="menu">
        <div className="logo">
          <img src={logo} alt="" />
          <span className="about-name">
            <Link to="/about"> <b>TECH STORE </b></Link>
          </span>
        </div>
        <HeadlessTippy
         interactive
         placement="bottom"
         render={(attrs) => (
             <div className="" tabIndex="-1" {...attrs}>               
             </div>
         )}
        >
            <div className="menu-list1">
              <div className='my-icon'>
                <FontAwesomeIcon icon={faList}/>  </div>
              <div className="box-content">
                  <p> DANH MỤC </p>
              </div>
            </div>
        </HeadlessTippy>
        <div className="menu-list">
          <Search/>
        </div>
        <a className="about-contact">
            <div className="box-icon">
                <div className='my-icon'>
                    <FontAwesomeIcon icon={faPhoneVolume} className='fa-h-24px' />
                </div>
            </div>
            <div className="box-content">
                <p className="title">
                    Gọi mua hàng
                    <br/>
                    <strong>0396666666</strong>
                </p>
            </div>
        </a>
        <a className="about-delivery-tracking">
                <div className="box-icon">
                    <div className='my-icon'>
                        <FontAwesomeIcon icon={faTruckField} className='fa-h-24px' />
                    </div>
                </div>
                <div className="box-content">
                    <p className="title">
                        Tra cứu
                        <br />
                        đơn hàng
                    </p>
                </div>
            </a>
        <div className="menu-list">
          <div className="shop-cart">
              <Link to="/cart" className="shop-cart">
              <div className="box-icon">
                  <div className='my-icon'>
                      <FontAwesomeIcon icon={faBagShopping} className='fa-h-24px' />
                  </div>
              </div>
              <div className="box-content">
                  <p className="title">
                      Giỏ&nbsp;
                      <br />
                      hàng
                  </p>
                  <span className="count"> 0 </span>
              </div>        
              </Link>
              {localStorage.getItem('auth-token')
                ?<div 
                    className="login-btn"
                    onClick={() => {
                        localStorage.removeItem('auth-token');
                        window.location.replace('/');
                    }}
                >
                    <div className="header-item about-member">
                        <div className="box-icon">
                            <div className="my-icon">
                                <FontAwesomeIcon icon={faCircleUser} className='avatar' />
                            </div>
                        </div>
                        <div className="box-content">
                            <span className="title">Đăng xuất</span>
                        </div>
                    </div>
                </div>
                :<Link to='/login'>
                    <div className="login-btn">
                        <div className="header-item about-member">
                            <div className="box-icon">
                                <div className="my-icon">
                                    <FontAwesomeIcon icon={faCircleUser} className='avatar' />
                                </div>
                            </div>
                            <div className="box-content">
                                <span className="title">Đăng nhập</span>
                            </div>
                        </div>
                    </div>
                </Link>
                } 
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;

