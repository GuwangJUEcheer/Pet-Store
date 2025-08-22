import React from 'react';
import '../css/Services.css';

const Services: React.FC = () => {
  return (
    <div className="services-container">
      <div className="services-header">
        <h1>🎁 ご成約のお客様限定サービス 🎁</h1>
        <h2 className="services-subtitle">㊗️子猫の健やかな成長を願い5大特典㊗️</h2>
      </div>

      <div className="benefits-grid">
        <div className="benefit-card">
          <div className="benefit-number">01</div>
          <div className="benefit-emoji">📚</div>
          <h3>ハンドブックの提供</h3>
          <div className="benefit-content">
            <p>当舎では、猫舎環境、猫舎理念、提供しているサービス、子猫の情報、そしてワクチン接種記録などを詳細に紹介したハンドブックをお渡ししています。</p>
            <p>新しい飼い主様に、私たちの猫舎と子猫について深く理解していただけるようサポートいたします。</p>
          </div>
        </div>

        <div className="benefit-card">
          <div className="benefit-number">02</div>
          <div className="benefit-emoji">🎁</div>
          <h3>猫の日常用品と自社ブランド製品の提供</h3>
          <div className="benefit-content">
            <p>当舎では、猫の日常用品に加え、自社ブランドの様々な製品も提供しております。</p>
            <p>子猫が好むおもちゃ、猫砂、猫ベッドなど、個々の猫の性格や好みに合わせた日常用品を用意しております。猫の快適な生活をサポートいたします。</p>
          </div>
        </div>

        <div className="benefit-card">
          <div className="benefit-number">03</div>
          <div className="benefit-emoji">🥫</div>
          <h3>子猫の好物の缶詰とフリーズドライフード</h3>
          <div className="benefit-content">
            <p>当舎では、各子猫の食欲に合わせて、好みの缶詰とフリーズドライフードを提供しております。</p>
            <p>子猫の年齢や健康状態に応じたバランスの取れた栄養豊富な食事を提供し、健やかな成長をサポートいたします。</p>
          </div>
        </div>

        <div className="benefit-card">
          <div className="benefit-number">04</div>
          <div className="benefit-emoji">🍽️</div>
          <h3>2週間分のフードを無料サービス</h3>
          <div className="benefit-content">
            <p>当舎では、子猫が新しいお家に慣れる期間中に、2週間分のフードを無料で提供しております。</p>
            <p>新しい食事環境への順応を円滑に進めるため、しっかりとサポートいたします。</p>
          </div>
        </div>

        <div className="benefit-card">
          <div className="benefit-number">05</div>
          <div className="benefit-emoji">🏥</div>
          <h3>様々な健康診断報告書</h3>
          <div className="benefit-content">
            <p>子猫が新しいお家に移る際には、綿密に作成された健康診断報告書を提供しております。</p>
            <p>この報告書には、健康診断の結果、猫パルボウイルス感染症検査結果、検便報告書、血統書、両親の遺伝性疾患検査結果のコピーなどが含まれています。</p>
            <p>また、短足猫の場合はレントゲン写真も添付しています。これらの報告書は、子猫の健康状態に関する完全な記録を提供し、新しい飼い主の方々が安心して新しい家族をお世話することができるようにサポートいたします。</p>
          </div>
        </div>
      </div>

      <div className="services-footer">
        <p>🌟 私たちは最高品質のサービスを提供し、子猫たちの未来に健康と幸福をもたらすことに全力を注いでいます 🌟</p>
      </div>

      {/* 引き渡し方法・送料 */}
      <section className="delivery-section">
        <h2 className="section-title">📦 引き渡し方法・送料 📦</h2>
        <div className="delivery-table">
          <div className="delivery-row header">
            <div className="delivery-cell">引き渡し方法</div>
            <div className="delivery-cell">送料</div>
            <div className="delivery-cell">備考</div>
          </div>
          <div className="delivery-row">
            <div className="delivery-cell">直接お迎え</div>
            <div className="delivery-cell">送料は発生しません</div>
            <div className="delivery-cell">-</div>
          </div>
          <div className="delivery-row">
            <div className="delivery-cell">空輸（直行便）</div>
            <div className="delivery-cell">15,000円（税込）～</div>
            <div className="delivery-cell">子猫の状態、時期、距離等によって可否・価格変わるためご相談ください</div>
          </div>
          <div className="delivery-row">
            <div className="delivery-cell">陸送</div>
            <div className="delivery-cell">5,000円（税込）～</div>
            <div className="delivery-cell">子猫の状態、時期、距離等によって可否・価格変わるためご相談ください</div>
          </div>
        </div>
        <div className="delivery-notes">
          <p>• 直接お迎えの場合、お引き取り日時を決定の上、お引き取りに来ていただきます。</p>
          <p>• 航空便の場合、一度ご見学いただいた後、到着日等打ち合わせの上、最寄りの空港でお引き取りいただきます。</p>
        </div>
      </section>

      {/* 引き渡し時期 */}
      <section className="handover-timing-section">
        <h2 className="section-title">⏰ 引き渡し時期 ⏰</h2>
        <div className="handover-content">
          <p>ご購入お申込み後、ご入金が確認出来次第、ご希望の引き渡し方法・日時にお引き渡しいたします。</p>
          <p>当舎では、子猫が引き渡し時期として、<strong>生後約90日（つまり第12週目、第三回目のワクチン接種完了後）</strong>を推奨しています。</p>
          <p>法律では最早で生後57日での販売が認められていますが、私たちは<strong>9週齢（63日目）頃に第二回目のワクチン接種を終えてから引き渡し</strong>をお勧めしています。</p>
          <p>猫のそれぞれの状況によって、引き渡し時期も異なるため、詳細は子猫の紹介をご覧ください。</p>
        </div>
      </section>

      {/* 支払い方法 */}
      <section className="payment-section">
        <h2 className="section-title">💳 支払い方法 💳</h2>
        <div className="payment-methods">
          <div className="payment-method">
            <div className="payment-icon">💵</div>
            <h3>現金払い</h3>
          </div>
          <div className="payment-method">
            <div className="payment-icon">🏦</div>
            <h3>銀行振込</h3>
            <p>paypay銀行</p>
          </div>
          <div className="payment-method">
            <div className="payment-icon">📮</div>
            <h3>現金書留</h3>
          </div>
          <div className="payment-method">
            <div className="payment-icon">📱</div>
            <h3>paypay</h3>
            <p>paypayに関連するwechatpay、alipayなど使えます。</p>
          </div>
        </div>
      </section>

      {/* 予約金 */}
      <section className="reservation-section">
        <h2 className="section-title">💰 予約金について 💰</h2>
        <div className="reservation-content">
          <p>ご予約される前には、ご家庭の飼育環境や猫の飼育歴などに関する必要な事をお尋ねいたします。</p>
          
          <div className="reservation-rules">
            <div className="reservation-rule">
              <h4>① 基本予約金</h4>
              <p>ご予約金として、販売価格の30％以上のご入金をお願いします。</p>
              <p>ご入金確認後　商談中という事で他の方へのご案内は致しません。</p>
              <p className="warning">⚠️ お客様のご都合でキャンセルされる時には、いかなる理由によりましても、ご返金できません。</p>
            </div>

            <div className="reservation-rule">
              <h4>② 仮予約（10日間）</h4>
              <p>見学される日にちが今は決まらず、でも押さえて置いて欲しいという強い希望があれば<strong>１０日間位</strong>であれば商談中ということで、他の方にご案内は致しません。</p>
              <p>この場合も、内入のご予約金をお振込み下さい【５万円】</p>
              <p className="warning">⚠️ 購入の意志がある上でのお申し込みという前提なので、見学自体キャンセルになったり、見学後キャンセルになった場合のご返金も致しかねます。</p>
            </div>

            <div className="reservation-rule">
              <h4>③ お預かり料金</h4>
              <p>仔猫の引渡し時期までに、暫く期間がある場合は、別途お預かり金を頂く場合があります。</p>
              <p><strong>3回目ワクチン接種しましたあとで</strong>、お客様のご都合によりお引き渡しまでに14日（2週間）以上の日数を要する場合は<strong>15日以降別途、１日につき600円</strong>のお預かり料金が発生いたします。</p>
            </div>

            <div className="reservation-rule">
              <h4>④ 最終決済</h4>
              <p>仔猫引渡しの１週間前までの決済、遅くとも当日には、全額のお支払いが必須です。</p>
            </div>
          </div>

          <div className="important-notes">
            <h4>⚠️ 重要事項</h4>
            <ul>
              <li>上記いずれの場合のキャンセルにつきましても、ご返金は致し兼ねます。</li>
              <li>見学のお申し込みは、ある程度の購入の意志を持ってお願いいたします。</li>
              <li>ご予約金の振込確認をもちまして、仮受付、商談中とします。</li>
              <li>お問い合わせのやり取りだけによる仔猫の確保はできませんので、宜しくお願いいたします。</li>
              <li>母猫と離れても安心して生活のできる状況になってからのワクチン接種とお引越しになります</li>
              <li>仔猫の体調によりお引渡しが延期になる事もあります</li>
              <li>ご予約頂いた仔猫はお引き渡しの日まで適切にお預かりいたしますが　体調不良などのやむ負えない理由により お引渡しの出来ない状況になった場合は代猫による対応をさせて頂きます</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;