import React from 'react';
import { RouteObject } from 'react-router-dom';
import Home from './components/home'

// 使用 RouteObject 类型来指定路由
const routes: RouteObject[] = [
  {
    path: '/home',
    element: <Home />, // 指定渲染的组件
  }
];

export default routes;
