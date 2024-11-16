import React from 'react';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  HomeOutlined,
  AppstoreOutlined,
  ShopOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import '../css/Sidebar.css';
import logo from '../images/logo.png'
import insta from '../images/ico_insta.png'
import tiktok from '../images/ico_tiktok_blk.svg'
const { Sider } = Layout;

const Sidebar: React.FC = () => {
  return (
    <Sider width="20%" className="sidebar" theme="light">
      <div className="logo">
        <a href="/">
          <img src={logo} alt="Logo" style={{ width: '50%' }} />
        </a>
      </div>
      <div className="gNav">
          <nav>
            <ul>
              <li><a href="/about/">Cat Loungeとは<span>About us</span></a></li>
              <li><a href="/news/">最新子猫情報<span>What's new</span></a></li>
              <li><a href="/history/">過去子猫紹介<span>History</span></a></li>
              <li><a href="/breed/">取扱猫種紹介<span>Cat breed</span></a></li>
              <li><a href="/buy/">ご購入について<span>Buying info</span></a></li>
              <li><a href="/pet-hotel/">ペットホテルについて<span>Pet hotel</span></a></li>
              <li><a href="/shop/">店舗情報・アクセス<span>Shop info・Access</span></a></li>
              <li><a href="https://catlounge418.base.shop" target="_blank" rel="noopener noreferrer">オンラインショップ<span>Online Shop</span></a></li>
            </ul>
          </nav>
          <ul className="snsList">
            <li><a href="https://www.instagram.com/cat_lounge0418/" target="_blank"><img src={insta} alt="" style={{ width: "28px" }} /></a></li>
            <li><a href="https://www.tiktok.com/@maririn523828" target="_blank"><img src={tiktok} alt="" style={{ width: "21px" }} /></a></li>
          </ul>
          <div className="contactBtn">
            <a href="/contact/"><i className="fas fa-caret-right"></i>&nbsp;お問い合わせ</a>
          </div>
        </div>
    </Sider>
  );
};

export default Sidebar;
