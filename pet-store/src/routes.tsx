import React from 'react';
import { RouteObject } from 'react-router-dom';
import About from "./components/About";
import HomePageContent from './components/HomePageContent';
import LoginPage  from './components/LoginPage';
import News from './components/News';
import History from "./components/History";
import BreedList from "./components/BreedList";
import Buy from "./components/Buy";
import PetHotel from "./components/PetHotel";
import ShopInfo from "./components/ShopInfo";



// 使用 RouteObject 类型来指定路由
const routes: RouteObject[] = [
  {
    path: "/about",
    element: <About />,
  },
  {
    path: '/',
    element: <HomePageContent/>, // 主页
  },
  {
    path: "/news",
    element: <News />, // 最新子猫情报页面
  },
  {
    path: "/history",
    element: <History />, // 新增路由
  },
  {
    path: "/breed",
    element: <BreedList />, // 猫种介绍页面
  },
  {
    path: "/buy",
    element: <Buy />, // 购入页面
  },
  {
    path: "/pethotel",
    element: <PetHotel />, // 宠物酒店页面
  },
  {
    path: "/shop",
    element: <ShopInfo />, // 店铺情报页面
  },
  {
    path: '/login',
    element: <LoginPage/>, // 指定渲染的组件
  }

];

export default routes;
