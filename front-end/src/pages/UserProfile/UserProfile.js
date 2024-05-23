import React, { useContext, useEffect, useState } from 'react';
import AllApi from "../../api/api";
import { AuthContext } from "../../components/AuthContext/AuthContext";
import './UserProfile.css';

const UserProfile = () => {
    const { user, isLoggedIn } = useContext(AuthContext); // Lấy thông tin user từ context
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isLoggedIn && user) {
            AllApi.getUserInfo(user.id) 
                .then(response => {
                    setUserInfo(response.data);
                    setLoading(false);
                })
                .catch(err => {
                    setError(err);
                    setLoading(false);
                });
        }
    }, [isLoggedIn, user]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h1>User Profile</h1>
            {userInfo ? (
                <div>
                    <p><strong>Name:</strong> {userInfo.name}</p>
                    <p><strong>Email:</strong> {userInfo.email}</p>
                    {/* Hiển thị thêm thông tin người dùng*/}
                </div>
            ) : (
                <div>No user information available.</div>
            )}
        </div>
    );
}

export default UserProfile;
