import React, { useEffect, useState } from 'react';
import './Profile.css';
import { getUserInfo } from '../api/user';

const Profile = () => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    getUserInfo().then(res => {
      console.log('userInfo:', res.data); 
      setUserInfo(res.data);
    });
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-box">
        <h2 className="profile-title">个人信息</h2>
        <div style={{color:'#555', fontSize:'1rem', marginTop:'10px', textAlign:'left'}}>
          <p>手机号：{userInfo.phone}</p>
          <p>用户名：{userInfo.username}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile; 