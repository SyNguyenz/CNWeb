import React from "react";
import "./Login.css";
import { useState } from "react";
import AllApi from "../../api/api";

export default function LoginPage(){
    const [phonenumber, setPhonenumber]=useState("");
    const [password, setPassword]=useState("");
    const [errors, setErrors]=useState("");

    const validatePhoneNumber = (phoneNumber) => {
        return /^(0)[3|5|7|8|9][0-9]{8}$/.test(phoneNumber); //kiểm tra phonenumber hợp lệ
    };

    const handleSubmit =async (event) => {
        event.preventDefault();

        const errors = {};

        //Kiểm tra định dạng các trường dữ liệu nhập vào
        if (!phonenumber) {
            errors.phonenumber = "Hãy nhập số điện thoại";
        } else if(!validatePhoneNumber(phonenumber)) {
            errors.phonenumber = "Hãy nhập số điện thoại hợp lệ!";
        }
        if (!password) {
            errors.password = "Hãy nhập mật khẩu!";
        }
        //Kiểm tra user trong database

        const user = {
            phoneNumber: phonenumber,
            password: password
        }
        await Login(user);
    };

    //Lấy dữ liệu từ database
    const Login = async (user) => {//Sửa hàm này để lấy dữ liệu người dùng từ database
        const response = await AllApi.login(user);
        if(response.Success === false){
            if(response.Message === "Invalid phonenumber"){
                errors.phonenumber = "Số điện thoại không tồn tại!";
            }
            if(response.Message === "Wrong password"){
                errors.password = "Sai mật khẩu!";
            }
            setErrors(errors);
        }
        await AllApi.GetAdmin();
    };

   

    return(
        <div className="container">
            <div className="login-form">
                <div class="title">Chào mừng quay lại với <span class="app-name">YINN</span></div>
                <div class="subtitle">Đăng nhập vào tài khoản của bạn</div>
                <form onSubmit={handleSubmit}>
                    <div class="input-container">
                        <div>
                            <label for="phonenumber">Số điện thoại</label>
                            <input type="text" id="phonenumber" onChange={(e) =>setPhonenumber(e.target.value)}/>
                        </div>
                        {errors.phonenumber&&<div className="error">{errors.phonenumber}</div>}

                            
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