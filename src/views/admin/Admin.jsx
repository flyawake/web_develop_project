import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getActivitiesByCreator } from '../../api/activity';
import './Admin.css';

const Admin = () => {
  const navigate = useNavigate();
  const [myActivities, setMyActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (currentUser) {
      fetchMyActivities();
    }
  }, [currentUser]);

  const fetchMyActivities = async () => {
    try {
      const response = await getActivitiesByCreator(currentUser.id);
      if (response.success) {
        setMyActivities(response.data);
      }
    } catch (error) {
      console.error('获取我的活动失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('zh-CN');
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1 className="admin-title">管理员</h1>
        <button className="create-btn" onClick={() => navigate('/create')}>
          创建新活动
        </button>
      </div>
      
      <div className="admin-content">
        <div className="admin-section">
          <h3>我创建的活动</h3>
          {loading ? (
            <div className="loading">加载中...</div>
          ) : (
            <div className="activities-list">
              {myActivities.length === 0 ? (
                <p className="no-activities">暂无活动，点击上方按钮创建第一个活动</p>
              ) : (
                myActivities.map(activity => (
                  <div key={activity.id} className="activity-item">
                    <div className="activity-info">
                      <h4>{activity.title}</h4>
                      <p>地点: {activity.location}</p>
                      <p>时间: {formatDate(activity.startTime)}</p>
                      <p>参与人数: {activity.currentParticipants}/{activity.maxParticipants}</p>
                      <span className={`status-badge ${activity.status}`}>
                        {activity.status === 'active' ? '进行中' : '已结束'}
                      </span>
                    </div>
                    <div className="activity-actions">
                      <button 
                        onClick={() => navigate(`/activity/${activity.id}`)}
                        className="view-btn"
                      >
                        查看详情
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin; 