import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { login } from '../api/user';

const Login = () => {
  const [form, setForm] = useState({ phone: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const allFilled = form.phone.trim() && form.password.trim();
  const canSubmit = allFilled && !loading;

  const handleSubmit = async e => {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    try {
      const res = await login({ phone: form.phone, password: form.password });
      if (res && res.success) {
        navigate('/profile');
      } else {
        window.alert(res?.message || '登录失败，请重试');
      }
    } catch (err) {
      window.alert('登录失败，请检查网络或稍后再试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">体育活动室登录</h2>
        <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
          <div className="input-group">
            <label htmlFor="username">账号</label>
            <input
              type="text"
              id="username"
              name="phone"
              placeholder="请输入手机号"
              autoComplete="username"
              value={form.phone}
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
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            className="login-btn"
            disabled={!canSubmit}
            style={!canSubmit ? { background: '#eee', color: '#aaa', cursor: 'not-allowed' } : {}}
          >
            {loading ? '登录中...' : '登录'}
          </button>
        </form>
        <div className="login-decoration">
          <button className="register-btn" onClick={() => navigate('/register')} disabled={loading}>没有账号？点击注册</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
