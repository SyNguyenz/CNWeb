import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from '../Assets/logo.jpg';
import Search from "../Search";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faCircleUser, faList, faPhoneVolume, faTruckField } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import Tippy from '@tippyjs/react/headless';
import MenuBar from "../MenuBar/MenuBar";
import 'tippy.js/dist/tippy.css';
import { AuthContext } from "../AuthContext/AuthContext";
import { faBell, faComment } from '@fortawesome/free-solid-svg-icons';
import useSignalR from "../useSignalR/useSignalR";


function Header() {
    useEffect(() => {
        const role = localStorage.getItem("role");
        if(role === "admin") window.location.href = "/admin";
      });
    const [isMenu, setIsMenu] = useState(false);
    const { isLoggedIn, user, logout } = useContext(AuthContext);
    const [isRead, setIsRead] = useState(true); 

    const handleLogout = () => {
        logout();
        window.location.replace('/');
    };

    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const showMessage = (msg) => {
        setMessage(msg);
        setVisible(false); 
        setIsRead(false);
      };
      useSignalR(showMessage, '');
    const handleNewMessage = () => {
    //khi có thông báo mới thì setIsRead(false) để hiện dấu chấm đỏ
    setIsRead(true);
    if(message !== ''){
        setVisible(!visible);
    }
  };


console.log(isLoggedIn)
    return (
        <div className="header">
            <div className="menu">
                <div className="logo">
                <img src={logo} alt="Logo" />
                    <span className="about-name">
                        <Link to="/"> <b>TECH STORE</b></Link>
                    </span>
                </div>
                
                <HeadlessTippy
                    visible={isMenu}
                    interactive
                    placement="bottom-end"
                    onClickOutside={() => setIsMenu(false)} 
                    delay={[0, 700]}
                    render={(attrs) => (
                        <div className="menuBar" tabIndex="-1" {...attrs}>    
                            <MenuBar />         
                        </div>
                    )}
                >
                    <div className="menu-list1" onClick={() => setIsMenu(!isMenu)}>
                        <div className='my-icon'>
                            <FontAwesomeIcon icon={faList} />  
                        </div>
                        <div className="box-content">
                            <span className="title-y">DANH MỤC</span>
                        </div>
                    </div>
                </HeadlessTippy>
                
                <div className="menu-list">
                    <Search />
                </div>
                <Link to="/check" className="about-delivery-tracking" >
                    <div className="box-icon">
                        <div className='my-icon'>
                            <FontAwesomeIcon icon={faTruckField} className='fa-h-24px' />
                        </div>
                    </div>
                    <div className="box-content">
                        <p className="title-y">
                        Đơn hàng
                        </p>
                    </div>
                </Link>
                <div className="menu-list">
                    <div className="shop-cart">
                        <Link to="/order" className="shop-cart">
                            <div className="box-icon">
                                <div className='my-icon'>
                                    <FontAwesomeIcon icon={faBagShopping} className='fa-h-24px' />
                                </div>
                            </div>
                            <div className="box-content">
                                <p className="title-y">
                                    Giỏ&nbsp;
                                    <br />
                                    hàng
                                </p>
                                <span className="count"></span>
                            </div>        
                        </Link>
                    </div>
                </div>
                
                <div>
                    {isLoggedIn ? (
                    <div className="box-user">
                        <div className="box-icon">
                            <div className="my-icon">
                                <FontAwesomeIcon icon={faCircleUser} className='avatar' />
                            </div>
                        </div>
                
                        <span className="title-y">
                            <Link to='/user_profile'>{user}</Link>
                        </span>
                            
                    <div className="notification-icon">
                      <Tippy
                        interactive={true}
                        visible={visible}
                        placement="bottom"
                        onClickOutside={() => setVisible(false)}
                        render={attrs => (
                          <div className="tooltip-noti" {...attrs}>
                            {message}
                          </div>
                        )}
                      >
                        <button onClick={handleNewMessage} className="notification-icon">
                          <FontAwesomeIcon icon={faBell} className='icon-noti'/>
                          {!isRead && <FontAwesomeIcon icon={faComment} className="unread-dot"/>} {/* Hiển thị chấm đỏ nếu thông báo chưa đọc */}
                        </button>
                      </Tippy>
                    </div>
                        
            </div> 
            ): <div> </div>}
                </div> 
                <div>
                    {isLoggedIn ? (
                        <div className="login-btn" onClick={handleLogout}>
                            <div className="header-item about-member">
                                <div className="box-content">
                                    <span className="title-y">Đăng xuất</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Link to='/login'>
                            <div className="login-btn">
                                <div className="header-item about-member">
                                    <div className="box-content">
                                        <span className="title-y">Đăng nhập</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Header;
