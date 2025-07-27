import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getActivities } from '../api/activity';
import './ActivityList.css';

const ActivityList = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchActivities();
  }, [currentPage, searchTerm]);

  const fetchActivities = async () => {
    setLoading(true);
    try {
      const response = await getActivities(currentPage, 10, searchTerm);
      if (response.success) {
        setActivities(response.data.activities);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      console.error('获取活动列表失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handleActivityClick = (id) => {
    navigate(`/activity/${id}`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('zh-CN');
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="activity-list-container">
      <div className="activity-list-header">
        <h1>体育活动室</h1>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="搜索活动..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">搜索</button>
        </form>
      </div>

      {loading ? (
        <div className="loading">加载中...</div>
      ) : (
        <div className="activities-grid">
          {activities.map((activity) => (
            <div key={activity.id} className="activity-card" onClick={() => handleActivityClick(activity.id)}>
              <div className="activity-image">
                <img src={activity.imageUrl || '/default-activity.jpg'} alt={activity.title} />
              </div>
              <div className="activity-info">
                <h3 className="activity-title">{activity.title}</h3>
                <p className="activity-location">📍 {activity.location}</p>
                <p className="activity-time">
                  📅 {formatDate(activity.startTime)} {formatTime(activity.startTime)}
                </p>
                <p className="activity-participants">
                  👥 {activity.currentParticipants}/{activity.maxParticipants} 人
                </p>
                <div className="activity-status">
                  <span className={`status-badge ${activity.status}`}>
                    {activity.status === 'active' ? '进行中' : '已结束'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="page-btn"
          >
            上一页
          </button>
          <span className="page-info">{currentPage} / {totalPages}</span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="page-btn"
          >
            下一页
          </button>
        </div>
      )}
    </div>
  );
};

export default ActivityList; 