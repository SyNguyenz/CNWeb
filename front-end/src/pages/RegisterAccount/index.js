import React from "react";
import { useState } from "react";
import "./RegisterAccount.css";

export default function RegisterPage(){
    const [email,setEmail] = useState("");
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [rePassword,setRePassword] = useState("");
    const [errors,setErrors] = useState("");

    const validateEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);//kiểm tra email hợp lệ
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const errors = {};
        if (!email) {
            errors.email = "Hãy nhập email!";
        } else if (!validateEmail(email)) {
            errors.email = "Email không hợp lệ!";
        }
        if (!username) {
            errors.username = "Hãy tạo tên người dùng!";
        }
        if (!password) {
            errors.password = "Hãy tạo mật khẩu!";
        }
        if (!rePassword) {
            errors.rePassword = "Hãy xác nhận mật khẩu!";
        }
        else if(password !== rePassword){
            errors.rePassword = "Hãy xác nhận lại mật khẩu!"
        }
        
        const user = await checkUserExists(email);
        if (user) {
            errors.email = "Email đã được sử dụng!";
        }

        setErrors(errors);

        if (Object.keys(errors).length === 0) {

            // Tạo user mới và thêm vào database
            // Sửa phần dưới đây
            const newUser = {
                email: email,
                username: username,
                password: password
            };
            // tạo user mới 
            
        }
    
    };

    //Lấy dữ liệu từ database
    //Sửa hàm này để lấy dữ liệu người dùng từ database
    const checkUserExists = async (email) => {

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
                <div class="title">Chào mừng bạn đến với <span class="app-name">YINN</span></div>
                <div class="subtitle">Tạo tài khoản của bạn</div>
                <form  onSubmit={handleSubmit}>
                    <div class="input-container">
                        <div>
                            <label for="email">Email</label>
                            <input type="text" id="email"onChange={(e) => setEmail(e.target.value)}/>
                            
                        </div>
                        {errors.email && <div className="error">{errors.email}</div>}
                    </div>
                    
                    <div class="input-container">
                        <div>
                            <label for="username">Tạo tên người dùng</label>
                            <input type="text" id="username"onChange={(e) => setUsername(e.target.value)}/>
                        </div>
                        {errors.username && <div className="error">{errors.username}</div>}

            
                    </div>
                    <div class="input-container">
                        <div>
                            <label for="password">Mật khẩu</label>
                            <input type="password" id="password" onChange={(e)=> setPassword(e.target.value)}/>
                        </div>
                        {errors.password && <div className="error">{errors.password}</div>}
                    </div>
                    <div class="input-container">
                        <div>
                            <label for="re-password">Xác nhận mật khẩu</label>
                            <input type="password" id="re-password" onChange={(e)=> setRePassword(e.target.value)}/>
                        </div>
                        {errors.rePassword && <div className="error">{errors.rePassword}</div>}
                       
                    </div>
                    <button type="submit">Tạo tài khoản</button>
                </form>
                <div class="signup-link">Bạn đã có tài khoản? <a href="/register/login">Đăng nhập ngay!</a></div>
            </div>
        </div>
    );
}