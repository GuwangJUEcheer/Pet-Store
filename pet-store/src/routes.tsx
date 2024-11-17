import React from 'react';
import { RouteObject } from 'react-router-dom';
import Home from './components/Home';
import HomePageContent from './components/HomePageContent';
import LoginPage  from './components/LoginPage';

// 使用 RouteObject 类型来指定路由
const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePageContent/>, // 指定渲染的组件
  },
  {
    path: '/login',
    element: <LoginPage/>, // 指定渲染的组件
  }
];

export default routes;
