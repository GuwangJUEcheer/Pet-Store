import React from "react";
import "../css/PetHotel.css";

const PetHotel: React.FC = () => {
  return (
    <div className="hotel-container">
      <h1>ペットホテルについて</h1>
      <p className="subtitle">大切なペットを安心してお預けいただけます。</p>

      <section className="hotel-section">
        <h2>サービス内容</h2>
        <p>当店のペットホテルでは、以下のサービスを提供しております：</p>
        <ul>
          <li>24時間のスタッフ対応で安全管理</li>
          <li>快適な個室での宿泊</li>
          <li>毎日の健康チェックと食事提供</li>
          <li>お散歩や遊びの時間を確保</li>
        </ul>
      </section>

      <section className="price-section">
        <h2>料金表</h2>
        <p>宿泊プラン料金（税込）</p>
        <table className="price-table">
          <tbody>
            <tr>
              <td>1泊</td>
              <td>3,000円</td>
            </tr>
            <tr>
              <td>2泊3日</td>
              <td>8,000円</td>
            </tr>
            <tr>
              <td>1週間</td>
              <td>18,000円</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="caution-section">
        <h2>注意事項</h2>
        <p>ご利用に際して、以下の事項をご確認ください：</p>
        <ul>
          <li>ペットの健康診断書が必要です。</li>
          <li>伝染病予防接種を最新であることを確認してください。</li>
          <li>お預かり可能なペットは猫のみとなります。</li>
        </ul>
      </section>
    </div>
  );
};

export default PetHotel;
