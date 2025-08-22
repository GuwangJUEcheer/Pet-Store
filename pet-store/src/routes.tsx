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
import ParentTest from "./components/ParentTest";
import ParentManagement from "./pages/ParentManagement";
import PhotoManagerPage from "./pages/PhotoManagerPage";
import Services from "./components/Services";
import HealthGuarantee from "./components/HealthGuarantee";
import PastKittensManagement from "./pages/PastKittensManagement";

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
  {
    path: "/showTest",
    element: <ParentTest />, // 指定渲染的组件
  },
  {
    path: "/parent-management",
    element: <ParentManagement />, // 父母管理页面（仅管理员可访问）
  },
  {
    path: "/photo-manager/:kittenId",
    element: <PhotoManagerPage />, // 照片管理页面（仅管理员可访问）
  },
  {
    path: "/services",
    element: <Services />, // 5大特典服务页面
  },
  {
    path: "/health-guarantee",
    element: <HealthGuarantee />, // 健康保障页面
  },
  {
    path: "/past-kittens-management",
    element: <PastKittensManagement />, // 过去小猫管理页面（仅管理员可访问）
  },
];

export default routes;
