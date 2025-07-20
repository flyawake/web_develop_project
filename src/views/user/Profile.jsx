import React from 'react';
import './Profile.css';

const Profile = () => {
  return (
    <div className="profile-container">
      <div className="profile-box">
        <h2 className="profile-title">个人信息</h2>
        <div className="profile-content">
          <div className="profile-item">
            <span className="profile-label">手机号</span>
            <span className="profile-value">***********</span>
          </div>
          <div className="profile-item">
            <span className="profile-label">用户名</span>
            <span className="profile-value">未获取</span>
          </div>
          <div className="profile-item">
            <span className="profile-label">更多信息</span>
            <span className="profile-value">敬请期待</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 