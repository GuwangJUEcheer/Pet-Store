// Footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Footer.css';
import logo from '../images/logo.png';
import ins from '../images/ico_insta_02.png';
const Footer: React.FC = () => {
  return (
    <section className="news block01">
      <div className="inner">
        <ul>
          {/* 可以在这里添加新闻列表 */}
        </ul>
      </div>
      <footer className="footer">
        <p className="pageTop">
          <a href="#">
            <i className="fas fa-chevron-up"></i>
          </a>
        </p>
        <div className="footerInner">
          <nav className="footNav">
            <div className="logoDiv">
              <img src={logo} alt="Cat Lounge Logo" />
            </div>
            <ul className="navList">
              <li>
                <Link to="/">TOP</Link>
              </li>
              <li>
                <Link to="/about/">DoriaPetとは</Link>
              </li>
              <li>
                <Link to="/news/">最新子猫情報</Link>
              </li>
              <li>
                <Link to="/history/">過去子猫紹介</Link>
              </li>
              <li>
                <Link to="/breed/">取扱猫種紹介</Link>
              </li>
              <li>
                <Link to="/buy/">ご購入について</Link>
              </li>
              <li>
                <Link to="/shop/">店舗情報・アクセス</Link>
              </li>
              <li>
                <Link to="/contact/">お問い合わせ</Link>
              </li>
              <li>
                <Link to="/login">管理者登録</Link>
              </li>
            </ul>
          </nav>
          </div>           
        <p className="copyright">© Cat Lounge. All rights reserved.</p>
      </footer>
      <div className="bnr__insta">
      <Link to="https://www.instagram.com/cat_lounge0418/" target="_blank"><img src={ins} alt="CHECK!! INATAGRAM"/></Link>
     </div> 
    </section>
  );
};

export default Footer;
