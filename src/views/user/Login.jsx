import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../api/user';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    phone: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await login(form);
      if (res.success) {
        localStorage.setItem('user', JSON.stringify(res.data));
        if (res.data.role === 1) {
          navigate('/admin');
        } else {
          navigate('/profile');
        }
      } else {
        alert(res.message || '登录失败');
      }
    } catch (err) {
      alert('登录失败，请检查网络或稍后再试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">登录</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="phone">手机号</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="请输入手机号"
              value={form.phone}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="password">密码</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="请输入密码"
              value={form.password}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? '登录中...' : '登录'}
          </button>
        </form>
        
        <div className="login-footer">
          <p>还没有账号？<Link to="/register" className="register-link">立即注册</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login; 