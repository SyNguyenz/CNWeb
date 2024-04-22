import React from "react";
import "./Login.css";

export default function LoginPage(){
    return(
        <div className="Login-Page">
            <div className="Login-form">
                <h1 className="title">Đăng nhập tài khoản</h1>

                <form>

                    <div className="mb-2">
                        <label htmlFor="user-name" className="form-label">
                            Tên người dùng
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
                            Mật khẩu
                        </label>
                        <input
                            id="pass-word"
                            className="form-control"
                            type="text"
                            name="Password"
                        />
                    </div>
                    <button type="submit" className="submit-btn">
                        Đăng nhập
                    </button>
                    
                </form>
            </div>
        </div>
    );
}