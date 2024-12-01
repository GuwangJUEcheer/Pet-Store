import React from 'react';
import { Layout } from 'antd';
import '../css/Sidebar.css';
import logo from '../images/logo_sp1.png'
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
              <li><Link to="/about">Doriapet とは<span>About us</span></Link></li>
              <li><Link to="/news/">最新子猫情報<span>What's new</span></Link></li>
              <li><Link to="/history/">過去子猫紹介<span>History</span></Link></li>
              <li><Link to="/parent/">親猫紹介<span>Cat Parents</span></Link></li>
              <li><Link to="/minuet/">ミヌエットとは<span>What is Minuet Cat</span></Link></li>
              <li><Link to="/buy/">ご購入について<span>Buying info</span></Link></li>
              <li><Link to="/shop/">店舗情報・アクセス<span>Shop info・Access</span></Link></li>
              <li><Link to="https://www.nyatorajp.com/" target="_blank" rel="noopener noreferrer">自社ブランドショップサイト<span>Online Shop</span></Link></li>
            </ul>
          </nav>
          <ul className="snsList">
            <li><Link to="https://www.instagram.com/doriapet_minuet?igsh=Zm42YWYxczJ5OHVl&utm_source=qr" target="_blank"><img src={insta} alt="" style={{ width: "28px" }} /></Link></li>
            <li><Link to="https://www.tiktok.com/@doriapet?_t=8pIUi7YWL1r&_r=1" target="_blank"><img src={tiktok} alt="" style={{ width: "21px" }} /></Link></li>
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
