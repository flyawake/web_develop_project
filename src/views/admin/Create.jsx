import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { create_activity } from '../../api/activity';
import './Create.css';

const Create = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    content: '',
    startDate: '',
    endDate: '',
    registrationFee: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value || '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await create_activity({
        name: form.name,
        content: form.content,
        startDate: form.startDate,
        endDate: form.endDate,
        registrationFee: parseFloat(form.registrationFee) || 0
      });
      
      if (res && res.success) {
        alert('活动创建成功！');
        navigate('/admin');
      } else {
        alert(res?.message || '活动创建失败，请重试');
      }
    } catch (err) {
      alert('活动创建失败，请检查网络或稍后再试');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin');
  };

  return (
    <div className="create-container">
      <div className="create-box">
        <h2 className="create-title">创建活动</h2>
        <form className="create-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">活动名称</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="请输入活动名称"
              value={form.name || ''}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="content">活动内容</label>
            <textarea
              id="content"
              name="content"
              placeholder="请输入活动内容"
              value={form.content || ''}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          
          <div className="date-group">
            <div className="input-group">
              <label htmlFor="startDate">开始时间</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={form.startDate || ''}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            
            <div className="input-group">
              <label htmlFor="endDate">结束时间</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={form.endDate || ''}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
          </div>
          
          <div className="input-group">
            <label htmlFor="registrationFee">活动报名费</label>
            <input
              type="number"
              id="registrationFee"
              name="registrationFee"
              placeholder="请输入报名费（元）"
              value={form.registrationFee || ''}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
              disabled={loading}
            />
          </div>
          
          <div className="button-group">
            <button type="button" className="cancel-btn" onClick={handleCancel} disabled={loading}>
              取消
            </button>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? '创建中...' : '创建活动'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
