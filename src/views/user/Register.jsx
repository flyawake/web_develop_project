import React, { useState } from 'react';
import './Register.css';
import { register } from '../../api/user';
import { useNavigate, Link } from 'react-router-dom';

const isValidPhone = phone => /^1[3-9]\d{9}$/.test(phone);

const Register = () => {
  const [form, setForm] = useState({
    phone: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const phoneValid = isValidPhone(form.phone);
  const passwordMatch = form.password && form.password === form.confirmPassword;
  const allFilled = Object.values(form).every(v => v.trim() !== '');
  const canSubmit = phoneValid && passwordMatch && allFilled && !loading;

  const handleSubmit = async e => {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    try {
      const res = await register({
        phone: form.phone,
        username: form.username,
        password: form.password
      });
      if (res && res.success) {
        window.alert('注册成功，请登录！');
        navigate('/');
      } else {
        window.alert(res?.message || '注册失败，请重试');
      }
    } catch (err) {
      window.alert('注册失败，请检查网络或稍后再试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="register-title">体育活动室注册</h2>
        <form className="register-form" autoComplete="off" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="phone">手机号</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="请输入手机号"
              autoComplete="tel"
              value={form.phone}
              onChange={handleChange}
              disabled={loading}
            />
            {form.phone && !phoneValid && (
              <span style={{ color: '#d00', fontSize: '0.9em' }}>请输入合法的手机号</span>
            )}
          </div>
          <div className="input-group">
            <label htmlFor="username">用户名</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="请输入用户名"
              autoComplete="username"
              value={form.username}
              onChange={handleChange}
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
              autoComplete="new-password"
              value={form.password}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
          <div className="input-group">
            <label htmlFor="confirmPassword">确认密码</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="请再次输入密码"
              autoComplete="new-password"
              value={form.confirmPassword}
              onChange={handleChange}
              disabled={loading}
            />
            {form.confirmPassword && !passwordMatch && (
              <span style={{ color: '#d00', fontSize: '0.9em' }}>两次输入的密码不一致</span>
            )}
          </div>
          <button
            type="submit"
            className="register-btn"
            disabled={!canSubmit}
          >
            {loading ? '注册中...' : '注册'}
          </button>
        </form>
        
        <div className="register-footer">
          <p>已有账号？<Link to="/" className="login-link">立即登录</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register; 