// Footer.tsx
import React from 'react';
import '../css/Footer.css';
import logo from '../images/logo.png'

const Footer: React.FC = () => {
  return (
    <footer className="footer">
    <p className="pageTop"><a
        href="https://cat-lounge.com/#"><i className="fas fa-chevron-up"></i></a></p>
    <div className="footerInner">
      <nav className="footNav">
        <h2><img src={logo} alt=""/></h2>
        <ul className="navList">
          <li><a href="https://cat-lounge.com/">TOP</a></li>
          <li><a href="https://cat-lounge.com/about/">Cat Loungeとは</a></li>
          <li><a href="https://cat-lounge.com/news/">最新子猫情報</a></li>
          <li><a href="https://cat-lounge.com/history/">過去子猫紹介</a></li>
          <li><a href="https://cat-lounge.com/breed/">取扱猫種紹介</a></li>
          <li><a href="https://cat-lounge.com/buy/">ご購入について</a></li>
          <li><a href="https://cat-lounge.com/shop/">店舗情報・アクセス</a></li>
          <li><a href="https://cat-lounge.com/contact/">お問い合わせ</a></li>
        </ul>
      </nav>

    </div>
    <p className="copyright">© Cat Lounge. All rights reserved.</p>
  </footer>
  );
};

export default Footer;
