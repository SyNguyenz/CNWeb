import React from "react";
import "./Login.css";
import { useState } from "react";

export default function LoginPage(){
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [errors, setErrors]=useState("");

    const validateEmail = (email)   => {
        return /\S+@\S+\.\S+/.test(email);
    };
    
    const handleSubmit =async (event) => {
        event.preventDefault();

        const errors = {};

        //Kiểm tra định dạng các trường dữ liệu nhập vào
        if (!email) {
            errors.email = "Hãy nhập email!";
        } else if(!validateEmail(email)) {
            errors.email = "Hãy nhập email!";
        }
        if (!password) {
            errors.password = "Hãy nhập mật khẩu!";
        }
        //Kiểm tra user trong database

        const user = await checkUserExists(email);
        if(!user) {
            errors.email = "Email không tồn tại!";
        }

        if(user.password !== password) {
            errors.password = "Sai mật khẩu!";
        }
        setErrors(errors);

    };

    //Lấy dữ liệu từ database
    const checkUserExists = async (email) => {//Sửa hàm này để lấy dữ liệu người dùng từ database

        const sampleUser = {
            email: "example@example.com",
            password: "password123"
        };
        if (email === sampleUser.email) {
            return sampleUser;
        } else {
            return null;
        }
        //
    };

    return(
        <div className="container">
            <div className="login-form">
                <div class="title">Chào mừng quay lại với <span class="app-name">YINN</span></div>
                <div class="subtitle">Đăng nhập vào tài khoản của bạn</div>
                <form onSubmit={handleSubmit}>
                    <div class="input-container">
                        <div>
                            <label for="email">Email</label>
                            <input type="text" id="email" onChange={(e) =>setEmail(e.target.value)}/>
                        </div>
                        {errors.email&&<div className="error">{errors.email}</div>}

                            
                    </div>
                    <div class="input-container">
                        <div>
                            <label for="password">Mật khẩu</label>
                            <input type="password" id="password" onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        {errors.password && <div className="error">{errors.password}</div>}
                        
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