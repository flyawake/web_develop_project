import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const Admin = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1 className="admin-title">管理员界面</h1>
      </div>
      
      <div className="admin-content">
        <div className="admin-grid">
          <div className="admin-section">
            <h3>活动管理</h3>
            <div className="admin-buttons">
              <button className="admin-btn" onClick={() => navigate('/create')}>创建活动</button>
              <button className="admin-btn">查看活动列表</button>
              <button className="admin-btn">添加活动</button>
            </div>
          </div>
          
          <div className="admin-section">
            <h3>活动操作</h3>
            <div className="admin-buttons">
              <button className="admin-btn">查看活动报名列表</button>
              <button className="admin-btn">删除活动</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin; 