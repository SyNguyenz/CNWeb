import React, { useState } from "react";
import "./Login.css";
import AllApi from "../../api/api";

export default function LoginPage() {
    const [phonenumber, setPhonenumber] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const validatePhoneNumber = (phoneNumber) => {
        return /^(0)[3|5|7|8|9][0-9]{8}$/.test(phoneNumber);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const errors = {};

        if (!phonenumber) {
            errors.phonenumber = "Hãy nhập số điện thoại";
        } else if (!validatePhoneNumber(phonenumber)) {
            errors.phonenumber = "Hãy nhập số điện thoại hợp lệ!";
        }
        if (!password) {
            errors.password = "Hãy nhập mật khẩu!";
        }

        setErrors(errors);

        if (Object.keys(errors).length > 0) {
            return;
        }

        const user = {
            phoneNumber: phonenumber,
            password: password,
        };

        try {
            const response = await AllApi.login(user);
            if (response.Success) {
                // Lưu thông tin người dùng vào localStorage
                localStorage.setItem("user", JSON.stringify(response.user));

                // Đánh dấu đã đăng nhập
                setIsLoggedIn(true);

                // Chuyển hướng đến trang chủ hoặc trang khác
                window.location.href = "/home"; // Thay đổi đường dẫn cho phù hợp
            } else {
                const newErrors = { ...errors };
                if (response.Message === "Invalid phonenumber") {
                    newErrors.phonenumber = "Số điện thoại không tồn tại!";
                }
                if (response.Message === "Wrong password") {
                    newErrors.password = "Sai mật khẩu!";
                }
                setErrors(newErrors);
            }
        } catch (error) {
            console.error("Error during login:", error);
            setErrors({ apiError: "Đã có lỗi xảy ra. Vui lòng thử lại sau." });
        }
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