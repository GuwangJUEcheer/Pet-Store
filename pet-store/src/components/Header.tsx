// Header.tsx
import React from 'react';
import '../css/Header.css';
import pt1 from '../images/mvTtl.png'
const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="mainTtl">
        <h1 className="mainTtl">
          <span className="title">
            <img src={pt1} alt="" width="252" />
          </span><span className="text">猫を愛する、安心優良なブリーダーです。<br />
            信頼できるお客さまのもとで、子猫が幸せな時間を過ごすことを願っています。</span></h1>
      </div>

      <div className="contactBtn">
      <a href="/contact/"><i className="fas fa-caret-right"></i>&nbsp;+お問い合わせ</a>
     </div> 
    </header>
  );
};

export default Header;
