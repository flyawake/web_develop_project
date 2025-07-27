import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createActivity } from '../../api/activity';
import './Create.css';

const Create = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    maxParticipants: '',
    startTime: '',
    endTime: '',
    imageUrl: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert('请先登录');
      return;
    }

    setLoading(true);
    try {
      const activityData = {
        ...form,
        creatorId: currentUser.id,
        maxParticipants: parseInt(form.maxParticipants),
        startTime: new Date(form.startTime).toISOString(),
        endTime: new Date(form.endTime).toISOString()
      };

      const response = await createActivity(activityData);
      if (response.success) {
        alert('活动创建成功！');
        navigate('/admin');
      } else {
        alert(response.message || '创建失败');
      }
    } catch (error) {
      alert('创建失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin');
  };

  const allFieldsFilled = Object.values(form).every(value => value.trim() !== '');

  return (
    <div className="create-container">
      <div className="create-box">
        <h2 className="create-title">创建活动</h2>
        <form className="create-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="title">活动标题 *</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="请输入活动标题"
              value={form.title}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="description">活动描述 *</label>
            <textarea
              id="description"
              name="description"
              placeholder="请详细描述活动内容"
              value={form.description}
              onChange={handleChange}
              required
              disabled={loading}
              rows="4"
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="location">活动地点 *</label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="请输入活动地点"
              value={form.location}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          
          <div className="date-group">
            <div className="input-group">
              <label htmlFor="startTime">开始时间 *</label>
              <input
                type="datetime-local"
                id="startTime"
                name="startTime"
                value={form.startTime}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            
            <div className="input-group">
              <label htmlFor="endTime">结束时间 *</label>
              <input
                type="datetime-local"
                id="endTime"
                name="endTime"
                value={form.endTime}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
          </div>
          
          <div className="input-group">
            <label htmlFor="maxParticipants">最大参与人数 *</label>
            <input
              type="number"
              id="maxParticipants"
              name="maxParticipants"
              placeholder="请输入最大参与人数"
              value={form.maxParticipants}
              onChange={handleChange}
              min="1"
              required
              disabled={loading}
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="imageUrl">活动图片URL</label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              placeholder="请输入活动图片链接（可选）"
              value={form.imageUrl}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
          
          <div className="button-group">
            <button type="button" className="cancel-btn" onClick={handleCancel} disabled={loading}>
              取消
            </button>
            <button type="submit" className="submit-btn" disabled={!allFieldsFilled || loading}>
              {loading ? '创建中...' : '创建活动'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
