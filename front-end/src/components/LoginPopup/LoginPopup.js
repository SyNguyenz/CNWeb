import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginPopup.css'; 
import computer from '../Assets/computer.png'

const LoginPopup = ({ onLogin }) => {
  return (
    <div className="login-popup-container">
      <div className="login-popup">
        <div className="popup-content">
          <p>Vui lòng đăng nhập để thực hiện chức năng này!</p>
          <div className='popup-box'>
            <img src={computer}/>
            <Link to="/login">
              <button className = "button-popup"onClick={onLogin}>Đăng nhập</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
