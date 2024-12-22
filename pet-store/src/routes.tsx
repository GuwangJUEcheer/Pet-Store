import React from "react";
import { RouteObject } from "react-router-dom";
import About from "./components/About";
import HomePageContent from "./components/HomePageContent";
import LoginPage from "./components/LoginPage";
import News from "./components/News";
import KittenDetails from "./components/KittenDetails";
import History from "./components/History";
import Parent from "./components/Parent";
import Minuet from "./components/Minuet";
import Buy from "./components/Buy";
import ShopInfo from "./components/ShopInfo";
import Contact from "./components/Contact";
import SuccessPage from "./components/LoginSuccess";

// 使用 RouteObject 类型来指定路由
const routes: RouteObject[] = [
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/",
    element: <HomePageContent />, // 主页
  },
  {
    path: "/news",
    element: <News />, // 最新子猫情报页面
  },
  { path: "/kitten-details/:id", element: <KittenDetails /> },
  {
    path: "/history",
    element: <History />, // 过去子猫情报
  },
  {
    path: "/parent",
    element: <Parent />, // 猫父母
  },
  {
    path: "/minuet",
    element: <Minuet />, // minuet
  },
  {
    path: "/buy",
    element: <Buy />, // 购入页面
  },

  {
    path: "/shop",
    element: <ShopInfo />, // 店铺情报页面
  },
  {
    path: "/login",
    element: <LoginPage />, // 指定渲染的组件
  },
  {
    path: "/contact",
    element: <Contact />, // 指定渲染的组件
  },
  {
    path: "/success",
    element: <SuccessPage />, // 指定渲染的组件
  },
];

export default routes;
