import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getActivityById, deleteActivity } from '../../api/activity';
import { createOrder, getOrdersByActivity, updateOrderStatus } from '../../api/order';
import { createComment, getCommentsByActivity, deleteComment } from '../../api/comment';
import './ActivityDetail.css';

const ActivityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState(null);
  const [orders, setOrders] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [orderNote, setOrderNote] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [commentRating, setCommentRating] = useState(5);

  useEffect(() => {
    fetchActivityDetail();
  }, [id]);

  const fetchActivityDetail = async () => {
    try {
      const [activityRes, ordersRes, commentsRes] = await Promise.all([
        getActivityById(id),
        getOrdersByActivity(id),
        getCommentsByActivity(id)
      ]);

      if (activityRes.success) {
        setActivity(activityRes.data);
      }
      if (ordersRes.success) {
        setOrders(ordersRes.data);
      }
      if (commentsRes.success) {
        setComments(commentsRes.data);
      }
    } catch (error) {
      console.error('获取活动详情失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOrder = async () => {
    if (!currentUser) {
      alert('请先登录');
      return;
    }

    try {
      const response = await createOrder({
        userId: currentUser.id,
        activityId: parseInt(id),
        note: orderNote
      });

      if (response.success) {
        alert('报名成功！');
        setShowOrderForm(false);
        setOrderNote('');
        fetchActivityDetail();
      } else {
        alert(response.message || '报名失败');
      }
    } catch (error) {
      alert('报名失败，请重试');
    }
  };

  const handleComment = async () => {
    if (!currentUser) {
      alert('请先登录');
      return;
    }

    try {
      const response = await createComment({
        userId: currentUser.id,
        activityId: parseInt(id),
        content: commentContent,
        rating: commentRating
      });

      if (response.success) {
        alert('评论发布成功！');
        setShowCommentForm(false);
        setCommentContent('');
        setCommentRating(5);
        fetchActivityDetail();
      } else {
        alert(response.message || '评论发布失败');
      }
    } catch (error) {
      alert('评论发布失败，请重试');
    }
  };

  const handleOrderStatus = async (orderId, status) => {
    try {
      const response = await updateOrderStatus(orderId, status);
      if (response.success) {
        alert('订单状态更新成功！');
        fetchActivityDetail();
      } else {
        alert(response.message || '更新失败');
      }
    } catch (error) {
      alert('更新失败，请重试');
    }
  };

  const handleDeleteActivity = async () => {
    if (!confirm('确定要删除这个活动吗？')) return;

    try {
      const response = await deleteActivity(id);
      if (response.success) {
        alert('活动删除成功！');
        navigate('/activities');
      } else {
        alert(response.message || '删除失败');
      }
    } catch (error) {
      alert('删除失败，请重试');
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!confirm('确定要删除这条评论吗？')) return;

    try {
      const response = await deleteComment(commentId, currentUser.id);
      if (response.success) {
        alert('评论删除成功！');
        fetchActivityDetail();
      } else {
        alert(response.message || '删除失败');
      }
    } catch (error) {
      alert('删除失败，请重试');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('zh-CN');
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return <div className="loading">加载中...</div>;
  }

  if (!activity) {
    return <div className="error">活动不存在</div>;
  }

  const isCreator = currentUser && currentUser.id === activity.creator.id;
  const isAdmin = currentUser && currentUser.role === 1;
  const hasOrdered = orders.some(order => order.user.id === currentUser?.id);
  const userOrder = orders.find(order => order.user.id === currentUser?.id);

  return (
    <div className="activity-detail-container">
      <div className="activity-detail-header">
        <button onClick={() => navigate('/activities')} className="back-btn">
          ← 返回列表
        </button>
        {(isCreator || isAdmin) && (
          <div className="creator-actions">
            {isCreator && (
              <button onClick={() => navigate(`/edit/${id}`)} className="edit-btn">
                编辑活动
              </button>
            )}
            {(isCreator || isAdmin) && (
              <button onClick={handleDeleteActivity} className="delete-btn">
                删除活动
              </button>
            )}
          </div>
        )}
      </div>

      <div className="activity-detail-content">
        <div className="activity-main">
          <div className="activity-image">
            <img src={activity.imageUrl || '/default-activity.jpg'} alt={activity.title} />
          </div>
          
          <div className="activity-info">
            <h1 className="activity-title">{activity.title}</h1>
            <p className="activity-description">{activity.description}</p>
            
            <div className="activity-meta">
              <div className="meta-item">
                <span className="meta-label"> 地点:</span>
                <span className="meta-value">{activity.location}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label"> 开始时间:</span>
                <span className="meta-value">{formatDate(activity.startTime)} {formatTime(activity.startTime)}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label"> 结束时间:</span>
                <span className="meta-value">{formatDate(activity.endTime)} {formatTime(activity.endTime)}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label"> 参与人数:</span>
                <span className="meta-value">{activity.currentParticipants}/{activity.maxParticipants}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label"> 创建者:</span>
                <span className="meta-value">{activity.creator.username}</span>
              </div>
            </div>

            {!isCreator && activity.status === 'active' && (
              <div className="activity-actions">
                {!hasOrdered ? (
                  <button onClick={() => setShowOrderForm(true)} className="order-btn">
                    立即报名
                  </button>
                ) : (
                  <div className="order-status">
                    <span className={`status-badge ${userOrder.status}`}>
                      {userOrder.status === 'pending' ? '待审核' : 
                       userOrder.status === 'approved' ? '已通过' : '已拒绝'}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {(isCreator || isAdmin) && (
          <div className="orders-section">
            <h2>报名管理</h2>
            <div className="orders-list">
              {orders.map(order => (
                <div key={order.id} className="order-item">
                  <div className="order-info">
                    <span className="user-name">{order.user.username}</span>
                    <span className="order-note">{order.note}</span>
                    <span className="order-time">{formatDate(order.createdAt)}</span>
                  </div>
                  <div className="order-actions">
                    {order.status === 'pending' && (
                      <>
                        <button 
                          onClick={() => handleOrderStatus(order.id, 'approved')}
                          className="approve-btn"
                        >
                          通过
                        </button>
                        <button 
                          onClick={() => handleOrderStatus(order.id, 'rejected')}
                          className="reject-btn"
                        >
                          拒绝
                        </button>
                      </>
                    )}
                    <span className={`order-status ${order.status}`}>
                      {order.status === 'pending' ? '待审核' : 
                       order.status === 'approved' ? '已通过' : '已拒绝'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="comments-section">
          <div className="comments-header">
            <h2>评论 ({comments.length})</h2>
            {currentUser && (
              <button onClick={() => setShowCommentForm(true)} className="comment-btn">
                发表评论
              </button>
            )}
          </div>
          
          <div className="comments-list">
            {comments.map(comment => (
              <div key={comment.id} className="comment-item">
                <div className="comment-header">
                  <span className="comment-author">{comment.user.username}</span>
                  <span className="comment-rating">⭐ {comment.rating}/5</span>
                  <span className="comment-time">{formatDate(comment.createdAt)}</span>
                  {(currentUser && currentUser.id === comment.user.id) || isAdmin ? (
                    <button 
                      onClick={() => handleDeleteComment(comment.id)}
                      className="delete-comment-btn"
                    >
                      删除
                    </button>
                  ) : null}
                </div>
                <p className="comment-content">{comment.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showOrderForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>报名活动</h3>
            <textarea
              placeholder="备注信息（可选）"
              value={orderNote}
              onChange={(e) => setOrderNote(e.target.value)}
              className="order-note-input"
            />
            <div className="modal-actions">
              <button onClick={handleOrder} className="confirm-btn">确认报名</button>
              <button onClick={() => setShowOrderForm(false)} className="cancel-btn">取消</button>
            </div>
          </div>
        </div>
      )}

      {showCommentForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>发表评论</h3>
            <div className="rating-input">
              <span>评分:</span>
              <select value={commentRating} onChange={(e) => setCommentRating(parseInt(e.target.value))}>
                {[5, 4, 3, 2, 1].map(rating => (
                  <option key={rating} value={rating}>{rating} 星</option>
                ))}
              </select>
            </div>
            <textarea
              placeholder="请输入您的评论..."
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              className="comment-input"
            />
            <div className="modal-actions">
              <button onClick={handleComment} className="confirm-btn">发表评论</button>
              <button onClick={() => setShowCommentForm(false)} className="cancel-btn">取消</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityDetail; 