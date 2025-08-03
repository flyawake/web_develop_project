import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './GlobalHeader.css';

const GlobalHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const isLoggedIn = !!currentUser;

  if (!isLoggedIn) {
    return null;
  }

  return (
    <header className="global-header">
      <div className="header-content">
        <div className="header-left">
          <h1 className="logo" onClick={() => navigate('/profile')}>
            体育活动室
          </h1>
          <nav className="nav-menu">
            <button 
              className={`nav-item ${location.pathname === '/profile' ? 'active' : ''}`}
              onClick={() => navigate('/profile')}
            >
              个人中心
            </button>
            <button 
              className={`nav-item ${location.pathname === '/activities' ? 'active' : ''}`}
              onClick={() => navigate('/activities')}
            >
              活动列表
            </button>
            {currentUser?.role === 1 && (
              <>
                <button 
                  className={`nav-item ${location.pathname === '/admin' ? 'active' : ''}`}
                  onClick={() => navigate('/admin')}
                >
                  管理界面
                </button>
                <button 
                  className={`nav-item ${location.pathname === '/create' ? 'active' : ''}`}
                  onClick={() => navigate('/create')}
                >
                  创建活动
                </button>
              </>
            )}
          </nav>
        </div>
        <div className="header-right">
          <span className="user-info">
            欢迎，{currentUser?.username}
            {currentUser?.role === 1 && <span className="role-badge">管理员</span>}
          </span>
          <button onClick={handleLogout} className="logout-btn">
            退出登录
          </button>
        </div>
      </div>
    </header>
  );
};

export default GlobalHeader;