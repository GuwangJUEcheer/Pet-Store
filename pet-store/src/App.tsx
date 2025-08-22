// App.tsx
import React from 'react';
import { Layout } from 'antd';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router,useRoutes } from 'react-router-dom';
import { UserProvider } from "./context/UserContext";
import './App.css';
import routes from './routes'; // 路由配置

const { Content } = Layout;

// 封装路由渲染
const Routes = () => {
  const routing = useRoutes(routes); // 使用路由配置动态渲染内容
  return <>{routing}</>;
};

const App: React.FC = () => {
  return (
    <UserProvider>
    <Router> 
    <Layout style={{ minHeight: '100vh' }}>    
        <Sidebar />
      <Layout style={{ marginLeft: '19%' }}>
        <Header /> 
        <Content style={{ padding: '20px' ,background:'#fefbea'}}>
          <Routes /> {/* 动态加载路由内容 */}
        </Content> 
        <Footer />
      </Layout>
    </Layout>
    </Router>
    </UserProvider> 
  );
};

export default App;
