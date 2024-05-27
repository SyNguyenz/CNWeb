
import React, { useState,useEffect } from 'react';
import AllApi from '../../api/api';
import './UserProfile.css';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [iscurrentPasswordConfirmed, setIscurrentPasswordConfirmed] = useState(false);



    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await AllApi.getUserInfo();
                if (response.data) {
                    setUser(response.data);
                }
            } catch (error) {
                console.error('Failed to fetch user info', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserInfo();
    }, []);

    const maskPassword = (password) => {
        return '*'.repeat(password.length);
    };

    const handleConfirmcurrentPassword = async() => {
        try {
            const response = await AllApi.login({
                userName: user.userName,
                password: currentPassword
            });
            if (response.data.success) {
                setError('');
                setIscurrentPasswordConfirmed(true);
            } else {
                setError('Mật khẩu cũ không đúng');
            }
        } catch (error) {
            setError('Mật khẩu cũ không đúng');
        }
    };

    const handleChangePassword = async () => {
        try {
            await AllApi.changePassword(user.id, currentPassword, {
                userName: user.userName,
                phoneNumber: user.phoneNumber,
                password: newPassword,
                diaChi: user.diaChi
            });
            setShowChangePassword(false);
            setIscurrentPasswordConfirmed(false);
            setCurrentPassword('');
            setNewPassword('');
        } catch (error) {
            setError('Đổi mật khẩu thất bại');
        }
    };

    if (isLoading) {
        return <div style={{paddingTop: "200px",marginLeft:"600px", marginBottom:"200px",fontSize:"25px"}}>Loading...</div>;
    }

    if (!user) {
        return <div style={{paddingTop: "200px",marginLeft:"600px", marginBottom:"200px",fontSize:"25px"}}>Bạn chưa đăng nhập!</div>;
    }

    return (
        <div className="user-profile-container">
            <div className="user-profile-tilte">
                <h1>Thông tin người dùng</h1>
            </div>

            <div className="user-profile">
                <p><strong>Tên người dùng: </strong> {user.userName}</p>
                <p><strong>Số điện thoại: </strong> {user.phoneNumber}</p>
                <p><strong>Địa chỉ: </strong>{user.diaChi}</p>
                <p><strong>Mật khẩu: </strong> {maskPassword(user.password)}</p>

                <div className="change-user-password">
                <button onClick={() => setShowChangePassword(!showChangePassword)}>
                    Đổi mật khẩu
                </button>
                {showChangePassword && (
                    <div >
                        {!iscurrentPasswordConfirmed ? (
                            <>
                                <input
                                    type="password"
                                    placeholder="Xác nhận mật khẩu cũ"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                />
                                <button onClick={handleConfirmcurrentPassword}>Xác nhận</button>
                                {error && <p className="error">{error}</p>}
                            </>
                        ) : (
                            <>
                                <input
                                    type="password"
                                    placeholder="Nhập mật khẩu mới"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <button onClick={handleChangePassword}>Xác nhận</button>
                            </>
                        )}
                    </div>
                )}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;