
import React, { useState,useEffect } from 'react';
import AllApi from '../../api/api';
import './UserProfile.css';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [isOldPasswordConfirmed, setIsOldPasswordConfirmed] = useState(false);



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

    const handleConfirmOldPassword = () => {
        if (oldPassword !== user.password) {
            setError('Mật khẩu cũ không đúng');
            return;
        }
        setError('');
        setIsOldPasswordConfirmed(true);
    };

    const handleChangePassword = () => {
        console.log('Old Password:', oldPassword);
        console.log('New Password:', newPassword);
        // Sau khi đổi mật khẩu thành công,ẩn form đổi mật khẩu
        setShowChangePassword(false);
        setIsOldPasswordConfirmed(false);
        setOldPassword('');
        setNewPassword('');
    };

    if (isLoading) {
        return <p>Đang tải thông tin người dùng...</p>;
    }

    if (!user) {
        return <p>Bạn chưa đăng nhập.</p>;
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
                        {!isOldPasswordConfirmed ? (
                            <>
                                <input
                                    type="password"
                                    placeholder="Xác nhận mật khẩu cũ"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                />
                                <button onClick={handleConfirmOldPassword}>Xác nhận</button>
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