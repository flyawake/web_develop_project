import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Login from '../views/user/Login';
import Register from '../views/user/Register';
import Profile from '../views/user/Profile';
import Admin from '../views/admin/Admin';
import Create from '../views/admin/Create';
import ActivityList from '../views/activity/ActivityList';
import ActivityDetail from '../views/activity/ActivityDetail';

const routes = [
  { path: '/', element: <Login />, name: '登录' },
  { path: '/register', element: <Register />, name: '注册' },
  { path: '/profile', element: <Profile />, name: '个人信息' },
  { path: '/admin', element: <Admin />, name: '管理员界面' },
  { path: '/create', element: <Create />, name: '创建活动' },
  { path: '/activities', element: <ActivityList />, name: '活动列表' },
  { path: '/activity/:id', element: <ActivityDetail />, name: '活动详情' },
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