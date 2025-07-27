import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOrdersByUser } from '../../api/order';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (currentUser) {
      setUser(currentUser);
      fetchUserOrders(currentUser.id);
    }
  }, []);

  const fetchUserOrders = async (userId) => {
    try {
      const response = await getOrdersByUser(userId);
      if (response.success) {
        setOrders(response.data);
      }
    } catch (error) {
      console.error('获取用户订单失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('zh-CN');
  };

  if (!user) {
    return <div className="error">请先登录</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-box">
        <h2 className="profile-title">个人信息</h2>
        <div className="profile-content">
          <div className="profile-item">
            <span className="profile-label">手机号</span>
            <span className="profile-value">{user.phone}</span>
          </div>
          <div className="profile-item">
            <span className="profile-label">用户名</span>
            <span className="profile-value">{user.username}</span>
          </div>
          <div className="profile-item">
            <span className="profile-label">角色</span>
            <span className="profile-value">
              {user.role === 1 ? '管理员' : '普通用户'}
            </span>
          </div>
        </div>
        <div className="profile-actions">
          <button onClick={() => navigate('/activities')} className="action-btn">
            浏览活动
          </button>
          {user.role === 1 && (
            <button onClick={() => navigate('/admin')} className="action-btn admin-btn">
              管理界面
            </button>
          )}
        </div>
      </div>

      <div className="orders-box">
        <h3 className="orders-title">我的报名</h3>
        {loading ? (
          <div className="loading">加载中...</div>
        ) : (
          <div className="orders-list">
            {orders.length === 0 ? (
              <p className="no-orders">暂无报名记录</p>
            ) : (
              orders.map(order => (
                <div key={order.id} className="order-item">
                  <div className="order-info">
                    <h4>{order.activity.title}</h4>
                    <p>地点: {order.activity.location}</p>
                    <p>时间: {formatDate(order.activity.startTime)}</p>
                    <p>备注: {order.note || '无'}</p>
                    <span className={`order-status ${order.status}`}>
                      {order.status === 'pending' ? '待审核' : 
                       order.status === 'approved' ? '已通过' : '已拒绝'}
                    </span>
                  </div>
                  <div className="order-time">
                    {formatDate(order.createdAt)}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile; 