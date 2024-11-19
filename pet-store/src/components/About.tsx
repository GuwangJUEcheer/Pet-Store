import React from "react";
import "../css/About.css";
import cat1 from "../images/cat1.jpg";
import hotel from "../images/hotel.jpg";
import shop from "../images/shop.jpg";


const About: React.FC = () => {
  return (
    <main className="content">
      {/* 欢迎标题 */}
      <section className="hero">
        <h1>ようこそ、Cat Loungeへ！</h1>
        <p className="subtitle">
          家族の一員となる愛らしい子猫と、安心のサービスをご提供します。
        </p>
      </section>

      {/* 我们的服务 */}
      <section className="services">
        <h2 className="section-title">私たちのサービス</h2>
        <div className="services-grid">
          <div className="service-card">
            <img src={cat1} alt="Kittens" />
            <h3>健康で元気な子猫</h3>
            <p>厳選された子猫をお届けします</p>
          </div>
          <div className="service-card">
            <img src={hotel} alt="Pet Hotel" />
            <h3>ペットホテル</h3>
            <p>大切なペットを安心してお預けいただけます</p>
          </div>
          <div className="service-card">
            <img src={shop} alt="Online Shop" />
            <h3>オンラインショップ</h3>
            <p>便利なオンラインストアでペット用品をお買い求めください</p>
          </div>
        </div>
      </section>

      {/* 特色展示 */}
      <section className="features">
        <h2 className="section-title">当店の特徴</h2>
        <p>Cat Loungeでは、以下の3つの特徴でお客様にご満足いただいております：</p>
        <ul>
          <li>厳選された猫種</li>
          <li>経験豊富なスタッフによるサポート</li>
          <li>清潔で快適な環境</li>
        </ul>
      </section>

      {/* 联系方式 */}
      <section className="contact">
        <h2 className="section-title">お問い合わせ</h2>
        <p>ご質問やご相談がございましたら、お気軽にお問い合わせください：</p>
        <p>
          電話番号：03-1234-5678<br />
          メールアドレス：info@cat-haven.jp
        </p>
      </section>
    </main>
  );
};

export default About;
