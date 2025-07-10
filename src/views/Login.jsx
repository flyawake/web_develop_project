import React from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">盲盒世界登录</h2>
        <form className="login-form">
          <div className="input-group">
            <label htmlFor="username">账号</label>
            <input type="text" id="username" name="username" placeholder="请输入账号" autoComplete="username" />
          </div>
          <div className="input-group">
            <label htmlFor="password">密码</label>
            <input type="password" id="password" name="password" placeholder="请输入密码" autoComplete="current-password" />
          </div>
          <button type="submit" className="login-btn">登录</button>
        </form>
        <div className="login-decoration">
          <span className="blindbox-icon">🎁</span>
          <button className="register-btn" onClick={() => navigate('/register')}>没有账号？点击注册</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
