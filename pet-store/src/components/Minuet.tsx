import React, { useState } from "react";
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
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isHealthGuaranteeOpen, setIsHealthGuaranteeOpen] = useState(false);

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

      {/* 五大特典サービス - 折りたたみ可能 */}
      <section className="collapsible-section">
        <div 
          className="collapsible-header"
          onClick={() => setIsServicesOpen(!isServicesOpen)}
        >
          <h2>🎁 ご成約のお客様限定サービス</h2>
          <span className={`collapse-icon ${isServicesOpen ? 'open' : ''}`}>▼</span>
        </div>
        {isServicesOpen && (
          <div className="collapsible-content">
            <h3 className="services-subtitle">㊗️子猫の健やかな成長を願い5大特典㊗️</h3>
            
            <div className="benefits-grid">
              <div className="benefit-card">
                <div className="benefit-number">01</div>
                <div className="benefit-emoji">📚</div>
                <h4>ハンドブックの提供</h4>
                <p>当舎では、猫舎環境、猫舎理念、提供しているサービス、子猫の情報、そしてワクチン接種記録などを詳細に紹介したハンドブックをお渡ししています。新しい飼い主様に、私たちの猫舎と子猫について深く理解していただけるようサポートいたします。</p>
              </div>

              <div className="benefit-card">
                <div className="benefit-number">02</div>
                <div className="benefit-emoji">🎁</div>
                <h4>猫の日常用品と自社ブランド製品の提供</h4>
                <p>当舎では、猫の日常用品に加え、自社ブランドの様々な製品も提供しております。子猫が好むおもちゃ、猫砂、猫ベッドなど、個々の猫の性格や好みに合わせた日常用品を用意しております。</p>
              </div>

              <div className="benefit-card">
                <div className="benefit-number">03</div>
                <div className="benefit-emoji">🥫</div>
                <h4>子猫の好物の缶詰とフリーズドライフード</h4>
                <p>当舎では、各子猫の食欲に合わせて、好みの缶詰とフリーズドライフードを提供しております。子猫の年齢や健康状態に応じたバランスの取れた栄養豊富な食事を提供し、健やかな成長をサポートいたします。</p>
              </div>

              <div className="benefit-card">
                <div className="benefit-number">04</div>
                <div className="benefit-emoji">🍽️</div>
                <h4>2週間分のフードを無料サービス</h4>
                <p>当舎では、子猫が新しいお家に慣れる期間中に、2週間分のフードを無料で提供しております。新しい食事環境への順応を円滑に進めるため、しっかりとサポートいたします。</p>
              </div>

              <div className="benefit-card">
                <div className="benefit-number">05</div>
                <div className="benefit-emoji">🏥</div>
                <h4>様々な健康診断報告書</h4>
                <p>子猫が新しいお家に移る際には、綿密に作成された健康診断報告書を提供しております。この報告書には、健康診断の結果、猫パルボウイルス感染症検査結果、検便報告書、血統書、両親の遺伝性疾患検査結果のコピーなどが含まれています。</p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 生体保証 - 折りたたみ可能 */}
      <section className="collapsible-section">
        <div 
          className="collapsible-header"
          onClick={() => setIsHealthGuaranteeOpen(!isHealthGuaranteeOpen)}
        >
          <h2>🏥 生体保証</h2>
          <span className={`collapse-icon ${isHealthGuaranteeOpen ? 'open' : ''}`}>▼</span>
        </div>
        {isHealthGuaranteeOpen && (
          <div className="collapsible-content">
            <p className="health-subtitle">子猫が10年以上健康にあなたと一緒にいるために、最初から最高の保証を提供します</p>
            
            <div className="guarantee-cards">
              <div className="guarantee-card death-guarantee">
                <div className="guarantee-icon">🛡️</div>
                <h4>病死について</h4>
                <div className="guarantee-period">14日以内</div>
                <p>お引き渡しから<strong>14日以内</strong>に万一当該保証対象猫が病死した場合、ペットの生体代金の全額返金または、当キャッテリー全額負担にて同種・同額程度の生体を提供致します。</p>
              </div>

              <div className="guarantee-card congenital-guarantee">
                <div className="guarantee-icon">❤️</div>
                <h4>先天的疾患について</h4>
                <div className="guarantee-period">30日以内</div>
                <p>お引き渡しから<strong>30日以内</strong>に当該保証猫が先天性（心臓および脳）の病気で病死した場合、ペットの生体代金の全額返金または、当キャッテリー全額負担にて同種・同額程度の生体を提供致します。</p>
              </div>
            </div>

            <div className="guarantee-disclaimer">
              <h4>⚠️ 重要なお知らせ</h4>
              <p>上記のいずれの保証制度の場合にも、治療のための費用、獣医師などによる証明の為の費用、交通費、慰謝料は、保証の対象外とさせていただきます。</p>
              <p>★ 原則として販売した生体の返品・交換・買い戻しは致しません。</p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Minuet;
