import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Login from '../views/Login';
import Register from '../views/Register';

const routes = [
  { path: '/', element: <Login />, name: '登录' },
  { path: '/register', element: <Register />, name: '注册' },
  // 其他页面可继续添加
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