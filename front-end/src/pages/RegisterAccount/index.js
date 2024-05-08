import React from "react";
import { useState } from "react";
import "./RegisterAccount.css";
import AllApi from "../../api/api";

export default function RegisterPage(){
    const [phonenumber,setPhonenumber] = useState("");
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [rePassword,setRePassword] = useState("");
    const [errors,setErrors] = useState("");

    const validatePhoneNumber = (phoneNumber) => {
        return /^(0)[3|5|7|8|9][0-9]{8}$/.test(phoneNumber); //kiểm tra phonenumber hợp lệ
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const errors = {};
        if (!phonenumber) {
            errors.phonenumber = "Hãy nhập số điện thoại!";
        } else if (!validatePhoneNumber(phonenumber)) {
            errors.phonenumber = "Số điện thoại không hợp lệ!";
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

        setErrors(errors);

        if (Object.keys(errors).length === 0) {

            // Tạo user mới và thêm vào database
            // Sửa phần dưới đây
            const newUser = {
                userName: username,
                phonenumber: phonenumber,
                password: password,
                diaChi: ""
            };
            const savedUser = await addUser(newUser); // Lưu người dùng vào cơ sở dữ liệu
            console.log('Người dùng đã được thêm vào cơ sở dữ liệu:', savedUser);
        }
    };

    //Lấy dữ liệu từ database
    //thêm user vào database
    const addUser = async (newUser) => {
        try {
            //gửi yêu cầu POST đến API backend
            const response = await AllApi.register(newUser);
            // Kiểm tra phản hồi từ API
            if (response.status === 201) {
                // Thêm thành công
                return response.data;
            } else {
                // Nếu có lỗi, trả về null
                return null;
            }
        } catch (error) {
            if (error.response.status === 409) {
                
                errors.phonenumber = "Số điện thoại đã được sử dụng!";
                setErrors(errors);
            }
            else {
                // Xử lý lỗi nếu có
            console.error('Error occurred while checking user:', error);
            return null;
            }
        }
    };

    return(
        <div className="container">
            <div className="login-form">
                <div class="title">Chào mừng bạn đến với <span class="app-name">YINN</span></div>
                <div class="subtitle">Tạo tài khoản của bạn</div>
                <form  onSubmit={handleSubmit}>
                    <div class="input-container">
                        <div>
                            <label for="phonenumber">Số điện thoại</label>
                            <input type="text" id="phonenumber"onChange={(e) => setPhonenumber(e.target.value)}/>
                            
                        </div>
                        {errors.phonenumber && <div className="error">{errors.phonenumber}</div>}
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