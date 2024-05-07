import React from "react";
import "./Login.css";

export default function LoginPage(){
    return(
        <div className="container">
            <div className="login-form">
                <div class="title">Chào mừng quay lại với <span class="app-name">App</span></div>
                <div class="subtitle">Đăng nhập vào tài khoản của bạn</div>
                <form>
                    <div class="input-container">
                        <label for="email">Email</label>
                        <input type="text" id="email"/>
                    </div>
                    <div class="input-container">
                        <label for="password">Mật khẩu</label>
                        <input type="password" id="password"/>
                    </div>
                    <div class="forgot-password">
                        <a href="#">Quên mật khẩu?</a>
                    </div>
                    <button type="submit">Đăng nhập</button>
                </form>
                <div class="signup-link">Bạn chưa có tài khoản? <a href="/register">Đăng ký ngay!</a></div>
            </div>
        </div>
    );
}