import React from "react";
import "../css/ShopInfo.css";

const ShopInfo: React.FC = () => {
  return (
    <div className="shopinfo-container">
      <h1>店舗情報</h1>
      <p className="subtitle">当店の詳細な情報とアクセス方法をご案内します。</p>

      <section className="shopinfo-section">
        <h2>店舗所在地</h2>
        <p>
          〒123-4567
          <br />
          東京都新宿区猫町1-2-3
          <br />
          Cat Lounge 店舗ビル 2F
        </p>
      </section>

      <section className="shopinfo-section">
        <h2>営業時間</h2>
        <p>
          月〜土：10:00〜18:00
          <br />
          定休日：日曜日・祝日
        </p>
      </section>

      <section className="shopinfo-section">
        <h2>アクセス</h2>
        <p>
          最寄り駅：JR新宿駅東口 徒歩10分
          <br />
          バス停：猫町バス停 徒歩2分
        </p>
      </section>

      <section className="shopinfo-section">
        <h2>お問い合わせ</h2>
        <p>
          電話番号：03-1234-5678
          <br />
          メールアドレス：info@cat-lounge.jp
        </p>
      </section>
    </div>
  );
};

export default ShopInfo;
