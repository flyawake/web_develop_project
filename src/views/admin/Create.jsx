import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createActivity,uploadImage  } from '../../api/activity';
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
    endTime: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [fileInputKey, setFileInputKey] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // 创建预览URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setImagePreview('');
    // 重新渲染文件输入框
    setFileInputKey(prev => prev + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert('请先登录');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      
      // 添加活动数据
      formData.append('creatorId', currentUser.id);
      formData.append('title', form.title);
      formData.append('description', form.description);
      formData.append('location', form.location);
      formData.append('maxParticipants', form.maxParticipants);
      formData.append('startTime', new Date(form.startTime).toISOString());
      formData.append('endTime', new Date(form.endTime).toISOString());
      
      // 添加照片文件
      if (selectedFile) {
        const res = await uploadImage(selectedFile);
        if (res.success) {
          formData.append('imageUrl', res.data.imageUrl);
        }
      }

      const response = await createActivity(formData);
      if (response.success) {
        alert('活动创建成功！');
        navigate('/admin');
      } else {
        alert(response.message || '创建失败');
      }
    } catch (error) {
      console.error('创建失败:', error);
      alert('创建失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin');
  };

  const allFieldsFilled = Object.values(form).every(value => value.trim() !== '') && selectedFile;

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
            <label htmlFor="imageFile">活动图片 *</label>
                         <input
               key={fileInputKey}
               type="file"
               id="imageFile"
               name="imageFile"
               accept="image/*"
               onChange={handleFileChange}
               disabled={loading}
               required
               multiple={false}
             />
                         {imagePreview && (
               <div className="image-preview">
                 <img src={imagePreview} alt="预览" style={{ maxWidth: '200px', maxHeight: '200px' }} />
                 <button 
                   type="button" 
                   onClick={handleRemoveImage}
                   style={{
                     marginTop: '10px',
                     padding: '8px 16px',
                     backgroundColor: '#dc3545',
                     color: 'white',
                     border: 'none',
                     borderRadius: '4px',
                     cursor: 'pointer'
                   }}
                 >
                   删除图片
                 </button>
               </div>
             )}
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
