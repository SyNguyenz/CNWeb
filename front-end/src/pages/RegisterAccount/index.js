import React from "react";
import "./RegisterAccount.css";

export default function RegisterPage(){
    return(
        <div className="container">
            <div className="login-form">
                <div class="title">Chào mừng bạn đến với <span class="app-name">App</span></div>
                <div class="subtitle">Tạo tài khoản của bạn</div>
                <form>
                    <div class="input-container">
                        <label for="email">Email</label>
                        <input type="text" id="email"/>
                    </div>
                    <div class="input-container">
                        <label for="username">Tạo tên người dùng</label>
                        <input type="text" id="username"/>
                    </div>
                    <div class="input-container">
                        <label for="password">Mật khẩu</label>
                        <input type="password" id="password"/>
                    </div>
                    <div class="input-container">
                        <label for="re-password">Xác nhận mật khẩu</label>
                        <input type="password" id="re-password"/>
                    </div>
                    <button type="submit">Tạo tài khoản</button>
                </form>
                <div class="signup-link">Bạn đã có tài khoản? <a href="/register/login">Đăng nhập ngay!</a></div>
            </div>
        </div>
    );
}