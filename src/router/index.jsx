import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Login from '../views/Login';
import Register from '../views/Register';
import Profile from '../views/Profile';

const routes = [
  { path: '/', element: <Login />, name: '登录 - 体育活动室' },
  { path: '/register', element: <Register />, name: '注册 - 体育活动室' },
  { path: '/profile', element: <Profile />, name: '个人信息 - 体育活动室' },
];

const AppRouter = () => {
  const location = useLocation();

  React.useEffect(() => {
    const current = routes.find(r => r.path === location.pathname);
    document.title = current?.name;
  }, [location]);

  return (
    <Routes>
      {routes.map(r => (
        <Route key={r.path} path={r.path} element={r.element} />
      ))}
    </Routes>
  );
};

export default AppRouter; 