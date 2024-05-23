import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from '../Assets/logo.jpg';
import Search from "../Search";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faCircleUser, faList, faPhoneVolume, faTruckField } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import MenuBar from "../MenuBar/MenuBar";
import 'tippy.js/dist/tippy.css';
import { AuthContext } from "../AuthContext/AuthContext";

function Header() {
    const [isMenu, setIsMenu] = useState(false);
    const { isLoggedIn, user, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        window.location.replace('/');
    };

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
                <a className="about-contact">
                    <div className="box-icon">
                        <div className='my-icon'>
                            <FontAwesomeIcon icon={faPhoneVolume} className='fa-h-24px' />
                        </div>
                    </div>
                    <div className="box-content">
                        <p className="title-y">
                            Gọi mua hàng
                            <br />
                            <strong>0396666666</strong>
                        </p>
                    </div>
                </a>
              
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
                                <span className="count">0</span>
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
                    </div> 
                    ): <div></div>}
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
