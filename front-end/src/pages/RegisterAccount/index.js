import React from "react";
import "./RegisterAccount.css";

export default function RegisterPage(){
    return(
        <div className="Register-Page">
            <div className="Register-form">
                <h1 className="title">Đăng ký </h1>

                <form>

                    <div className="mb-2">
                        <label htmlFor="phone-number"className="form-label">
                            Nhập số điện thoại
                        </label>
                        <input
                            id="phone-number"
                            className="form-control"
                            type="text"
                            name="phoneNumber"
                        />
                    </div>
                    
                    <div className="mb-2">
                        <label htmlFor="user-name" className="form-label">
                            Tạo tên người dùng
                        </label>
                        <input
                            id="user-name"
                            className="form-control"
                            type="text"
                            name="UserName"
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="pass-word" className="form-label">
                            Tạo mật khẩu
                        </label>
                        <input
                            id="pass-word"
                            className="form-control"
                            type="text"
                            name="Password"
                        />
                    </div>
                    <button type="submit" className="submit-btn">
                        Tạo tài khoản
                    </button>
                    
                </form>
            </div>
        </div>
    );
}