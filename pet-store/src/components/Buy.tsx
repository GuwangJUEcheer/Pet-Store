import React from "react";
import "../css/Buy.css";

const Buy: React.FC = () => {
  return (
    <div className="buy-container">
      <h1>ご購入について</h1>
      <p className="subtitle">子猫をご購入される際の流れをご案内いたします。</p>

      <section className="buy-section">
        <h2>購入の流れ</h2>
        <p>
          当店では、お客様に安心して子猫をご購入いただけるよう、以下の手順を設けております：
        </p>
        <ol>
          <li>子猫の情報をご確認いただき、ご希望の子猫をお選びください。</li>
          <li>ご予約フォームまたはお電話にてご連絡ください。</li>
          <li>店舗にて直接お引き取り、または配送手続きを行います。</li>
          <li>子猫に関するアフターサポートもご利用いただけます。</li>
        </ol>
      </section>

      <section className="caution-section">
        <h2>注意事項</h2>
        <p>
          子猫の健康と安全を最優先に考え、以下の事項をご確認ください：
        </p>
        <ul>
          <li>生体販売のため、ご購入後の返品は原則お受けできません。</li>
          <li>健康診断書をお渡ししておりますので、必ずご確認ください。</li>
          <li>
            家族として迎え入れるための準備を事前に整えてください。
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Buy;
