import React from 'react';
import { Layout, Menu } from 'antd';
import '../css/Sidebar.css';
import logo from '../images/logo.png'
import insta from '../images/ico_insta.png'
import tiktok from '../images/ico_tiktok_blk.svg'
import {Link } from 'react-router-dom';
const { Sider } = Layout;

const Sidebar: React.FC = () => {
  return (
    <Sider width="20%" className="sidebar" theme="light">
      <div className="outScroll">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Logo" style={{ width: '50%' }} />
        </Link>
      </div>
      <div className="gNav">
          <nav>
            <ul>
              <li><Link to="/about">Cat Loungeとは<span>About us</span></Link></li>
              <li><Link to="/news/">最新子猫情報<span>What's new</span></Link></li>
              <li><Link to="/history/">過去子猫紹介<span>History</span></Link></li>
              <li><Link to="/breed/">取扱猫種紹介<span>Cat breed</span></Link></li>
              <li><Link to="/buy/">ご購入について<span>Buying info</span></Link></li>
              <li><Link to="/pethotel/">ペットホテルについて<span>Pet hotel</span></Link></li>
              <li><Link to="/shop/">店舗情報・アクセス<span>Shop info・Access</span></Link></li>
              <li><Link to="https://catlounge418.base.shop" target="_blank" rel="noopener noreferrer">オンラインショップ<span>Online Shop</span></Link></li>
              <li>
                <Link to="/login">管理者登録<span>Sign in As Admin</span></Link>
              </li>
            </ul>
          </nav>
          <ul className="snsList">
            <li><Link to="https://www.instagram.com/cat_lounge0418/" target="_blank"><img src={insta} alt="" style={{ width: "28px" }} /></Link></li>
            <li><Link to="https://www.tiktok.com/@maririn523828" target="_blank"><img src={tiktok} alt="" style={{ width: "21px" }} /></Link></li>
          </ul>
          <div className="contactBtn">
            <Link to="/contact/"><i className="fas fa-caret-right"></i>&nbsp;お問い合わせ</Link>
          </div>
        </div>
        </div>
    </Sider>
  );
};

export default Sidebar;
