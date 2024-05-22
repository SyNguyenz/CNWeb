import React, { useState, useEffect, useRef, useContext } from "react";
import addressData from './address-data.json';
import { Link } from "react-router-dom";
import "./RegisterAccount.css";
import AllApi from "../../api/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/AuthContext/AuthContext";

export default function RegisterPage() {
    const [phonenumber, setPhonenumber] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [diaChi, setDiaChi] = useState("");
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");

    const citisRef = useRef(null);
    const districtsRef = useRef(null);
    const wardsRef = useRef(null);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    useEffect(() => {
        renderCity(addressData);
    }, []);

    const renderCity = (data) => {
        data.forEach((x) => {
            citisRef.current.options[citisRef.current.options.length] = new Option(x.Name, x.Id);
        });
    };

    const handleCityChange = () => {
        districtsRef.current.length = 1;
        wardsRef.current.length = 1;
        if (citisRef.current.value !== "") {
            const result = addressData.filter((n) => n.Id === citisRef.current.value);
            result[0].Districts.forEach((k) => {
                districtsRef.current.options[districtsRef.current.options.length] = new Option(k.Name, k.Id);
            });
        }
    };

    const handleDistrictChange = () => {
        wardsRef.current.length = 1;
        if (districtsRef.current.value !== "") {
            const dataCity = addressData.filter((n) => n.Id === citisRef.current.value);
            const dataWards = dataCity[0].Districts.filter((n) => n.Id === districtsRef.current.value)[0].Wards;
            dataWards.forEach((w) => {
                wardsRef.current.options[wardsRef.current.options.length] = new Option(w.Name, w.Id);
            });
        }
    };

    const validatePhoneNumber = (phoneNumber) => {
        return /^(0)[3|5|7|8|9][0-9]{8}$/.test(phoneNumber);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const validationErrors = {};
        if (!phonenumber) {
            validationErrors.phonenumber = "Hãy nhập số điện thoại!";
        } else if (!validatePhoneNumber(phonenumber)) {
            validationErrors.phonenumber = "Số điện thoại không hợp lệ!";
        }
        if (!username) {
            validationErrors.username = "Hãy tạo tên người dùng!";
        }
        if (!password) {
            validationErrors.password = "Hãy tạo mật khẩu!";
        }
        if (!rePassword) {
            validationErrors.rePassword = "Hãy xác nhận mật khẩu!";
        } else if (password !== rePassword) {
            validationErrors.rePassword = "Hãy xác nhận lại mật khẩu!";
        }
        if (!citisRef.current.value || !districtsRef.current.value || !wardsRef.current.value) {
            validationErrors.diaChi = "Hãy chọn địa chỉ!";
        }

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            const addressString = `${citisRef.current.options[citisRef.current.selectedIndex].text}, ${districtsRef.current.options[districtsRef.current.selectedIndex].text}, ${wardsRef.current.options[wardsRef.current.selectedIndex].text}`;
            setDiaChi(addressString);
            const newUser = {
                userName: username,
                phonenumber: phonenumber,
                password: password,
                diaChi: addressString,
            };
            const savedUser = await addUser(newUser);
            if (savedUser) {
                // Đăng nhập người dùng và lưu vào AuthContext
                login(savedUser);
    
                // Chuyển hướng về trang chủ và hiển thị thông báo thành công
                setSuccessMessage("Đăng ký thành công! Đang chuyển hướng...");
                setTimeout(() => {
                    navigate('/');
                    window.location.reload();
                }, 2000);
            } else {
                console.log('Đã xảy ra lỗi khi thêm người dùng.');
            }
        }
    };

    const addUser = async (newUser) => {
        try {
            const response = await AllApi.register(newUser);
            if (response.status === 201) {
                return response.data;
            } else {
                return null;
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    phonenumber: "Số điện thoại đã được sử dụng!"
                }));
            } else {
                console.error('Error occurred while checking user:', error);
            }
            return null;
        }
    };

    return (
        <div className="container">
            <div className="login-form">
                <div className="title">Chào mừng bạn đến với <span className="app-name">TECH STORE</span></div>
                <div className="subtitle">Tạo tài khoản của bạn</div>
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <div>
                            <label htmlFor="phonenumber">Số điện thoại:</label>
                            <input type="text" id="phonenumber" value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)} />
                        </div>
                        {errors.phonenumber && <div className="error">{errors.phonenumber}</div>}
                    </div>
                    <div className="input-container">
                        <div>
                            <label htmlFor="username">Tạo tên người dùng:</label>
                            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        {errors.username && <div className="error">{errors.username}</div>}
                    </div>
                    <div className="input-container">
                        <label htmlFor="address">Địa chỉ:</label>
                        <div className="select-container">
                            <select className="form-select" id="city" ref={citisRef} onChange={handleCityChange}>
                                <option value="" selected>Tỉnh/thành phố</option>
                            </select>
                            <select className="form-select" id="district" ref={districtsRef} onChange={handleDistrictChange}>
                                <option value="" selected>Quận/huyện</option>
                            </select>
                            <select className="form-select" id="ward" ref={wardsRef}>
                                <option value="" selected>Phường/xã</option>
                            </select>
                        </div>
                        {errors.diaChi && <div className="error">{errors.diaChi}</div>}
                    </div>
                    <div className="input-container">
                        <div>
                            <label htmlFor="password">Mật khẩu:</label>
                            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        {errors.password && <div className="error">{errors.password}</div>}
                    </div>
                    <div className="input-container">
                        <div>
                            <label htmlFor="re-password">Xác nhận mật khẩu:</label>
                            <input type="password" id="re-password" value={rePassword} onChange={(e) => setRePassword(e.target.value)} />
                        </div>
                        {errors.rePassword && <div className="error">{errors.rePassword}</div>}
                    </div>
                    <button type="submit">Tạo tài khoản</button>
                </form>
                {successMessage && <div className="success-message">{successMessage}</div>}
                <div className="signup-link">Bạn đã có tài khoản? <Link to="/login">Đăng nhập ngay!</Link></div>
            </div>
        </div>
    );
}
