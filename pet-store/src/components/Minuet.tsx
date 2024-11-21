import React from "react";
import "../css/Minuet.css";

// 导入图片
import Minuet1 from "../images/minuet1.jpg";
import Minuet2 from "../images/minuet2.jpg";
import Minuet3 from "../images/minuet3.jpg";

const minuetFeatures = [
  "小さくて優雅な体型、短足（ただし長足のバリエーションもあります）",
  "穏やかで親しみやすい性格、家庭向き",
  "柔らかくて密な毛、長毛と短毛の両方があります",
  "人懐っこく、特に子供と一緒に育てるのに向いています",
  "健康状態は安定しており、適切な体重を維持する必要があります",
];

const Minuet: React.FC = () => {
  return (
    <div className="minuet-container">
      <h1>Minuet猫の紹介</h1>
      <p className="subtitle">
        小さくてかわいらしい、短足猫として知られるMinuet猫の特徴と魅力をご紹介します。
      </p>

      {/* 图片轮播 */}
      <div className="minuet-carousel">
        <div className="carousel-item">
          <img src={Minuet1} alt="Minuet 猫 1" className="carousel-image" />
        </div>
        <div className="carousel-item">
          <img src={Minuet2} alt="Minuet 猫 2" className="carousel-image" />
        </div>
        <div className="carousel-item">
          <img src={Minuet3} alt="Minuet 猫 3" className="carousel-image" />
        </div>
      </div>

      {/* 特点列表 */}
      <section className="minuet-features">
        <h2>Minuet猫の特徴</h2>
        <ul>
          {minuetFeatures.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </section>

      {/* 养育建议 */}
      <section className="minuet-care">
        <h2>Minuet猫の飼い方</h2>
        <p>
          Minuet猫はその愛らしい外見だけでなく、飼いやすい性格でも人気です。
          適切な飼育環境を整えることで、Minuet猫との素敵な生活を楽しむことができます。
        </p>
        <ul>
          <li>毎日ブラッシングをして毛玉を防ぐ</li>
          <li>質の高いキャットフードを選ぶ</li>
          <li>活発に遊ぶための猫用おもちゃを用意する</li>
          <li>定期的に健康診断を受けさせる</li>
        </ul>
      </section>
    </div>
  );
};

export default Minuet;
