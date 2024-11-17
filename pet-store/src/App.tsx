// App.tsx
import React from 'react';
import { Layout } from 'antd';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import MainVisual from './components/MainVisual';
import BreedList from './components/BreedList';
import News from './components/News';
import ScrollAnimation from './components/ScrollAnimation';
import BackToTop from './components/BackToTop';
import { BrowserRouter as Router, Route, Routes, useRoutes } from 'react-router-dom';
import './App.css';

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Router>      
        <Sidebar />
      </Router>
      <Layout style={{ marginLeft: '19%' }}>
        <Header />
        <Content style={{ padding: '20px' }}>
          <MainVisual />
          <BreedList />
          <News />
          <ScrollAnimation />
          <BackToTop />
        </Content>
        <Footer />
      </Layout>
    </Layout>

  );
};

export default App;
