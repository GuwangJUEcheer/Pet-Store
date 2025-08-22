import React from 'react';
import '../css/HealthGuarantee.css';

const HealthGuarantee: React.FC = () => {
  return (
    <div className="health-guarantee-container">
      <div className="health-header">
        <h1>🏥 生体保証 & 健康管理 🏥</h1>
        <p className="health-subtitle">子猫が10年以上健康にあなたと一緒にいるために、最初から最高の保証を提供します</p>
      </div>

      {/* 子猫の健康についての考え */}
      <section className="health-philosophy-section">
        <h2 className="section-title">🐾 子猫の健康についての考え</h2>
        <div className="philosophy-content">
          <p>子猫は生き物ですので、徹底管理していても絶対に安心ということは言えません。細菌、ウイルス、真菌、微生物が検査時に症状がなければ、引き渡し時に感染していない把握することが困難な場合があります。</p>
          <p>当キャッテリーは定期的に子猫や成猫の便検や各種検査を行い、法律で定められた年1回の健康診断やワクチン接種を厳守しています。お引き渡し前に、獣医に子猫の全身、糞及び各検査を検査させます。問題がなければ、お引き渡しができます。</p>
          <p className="highlight">ただし、検便検査で陰性でも風邪の症状が出ていなくても100%を保証することは出来ません。お引き渡し後に症状が出た場合は獣医さんへ行き治療をして下さい。免責となります。</p>
          <div className="preparation-box">
            <h3>✨ 子猫をお引き渡し前に、すべての準備を行います ✨</h3>
            <p>当キャッテリーでは、子猫に <strong>2回のワクチン注射</strong> と <strong>3回のレボリューション</strong>を行います。お引き渡しの数日前に、子猫は獣医による健康診断を受けます。</p>
            <p>獣医師による各種身体検査、検便、レントゲン（短足のみ）、猫パルボウイルス検査などの健康診断を受けます。</p>
          </div>
        </div>
      </section>

      {/* 保証内容 */}
      <section className="guarantee-types-section">
        <h2 className="section-title">🛡️ 保証内容</h2>
        <div className="guarantee-cards">
          <div className="guarantee-card death-guarantee">
            <div className="guarantee-icon">🛡️</div>
            <h3>病死について</h3>
            <div className="guarantee-period">14日以内</div>
            <p>お引き渡しから<strong>14日以内</strong>に万一当該保証対象猫が病死した場合</p>
            <div className="guarantee-options">
              <div className="option">🔹 ペットの生体代金の全額返金</div>
              <div className="option-or">または</div>
              <div className="option">🔹 当キャッテリー全額負担にて同種・同額程度の生体を提供</div>
            </div>
          </div>

          <div className="guarantee-card congenital-guarantee">
            <div className="guarantee-icon">❤️</div>
            <h3>先天的疾患について</h3>
            <div className="guarantee-period">30日以内</div>
            <p>お引き渡しから<strong>30日以内</strong>に当該保証猫が先天性（心臓および脳）の病気で病死した場合</p>
            <div className="guarantee-options">
              <div className="option">🔹 ペットの生体代金の全額返金</div>
              <div className="option-or">または</div>
              <div className="option">🔹 当キャッテリー全額負担にて同種・同額程度の生体を提供</div>
            </div>
          </div>
        </div>

        <div className="guarantee-disclaimer">
          <h4>⚠️ 重要なお知らせ</h4>
          <p>上記のいずれの保証制度の場合にも、治療のための費用、獣医師などによる証明の為の費用、交通費、慰謝料は、保証の対象外とさせていただきます。御理解、ご了承をお願い致します。</p>
          <p>また、オーナーさまの重過失や事故など（子猫が明らかに調子が悪いのに速やかに獣医師に診察を受けさせなかった場合・新鮮な水やネコ専用の適切な食事を与えなかった場合・事故などによる外傷・他）の場合、売り主の瑕疵担保責任に該当の場合には保証の対象外となりますので御注意下さい。</p>
        </div>

        <div className="no-return-policy">
          <p><strong>★ 原則として販売した生体の返品・交換・買い戻しは致しません。</strong></p>
        </div>
      </section>

      {/* 保証適用外事項 */}
      <section className="exclusion-section">
        <h2 className="section-title">⚠️ 生命保証に関して、適用外事項</h2>
        <div className="exclusion-list">
          <div className="exclusion-item">
            <span className="exclusion-number">①</span>
            <p>飼い主様の故意、過失および飼育上の問題に起因する死亡、病気ならびに盗難、事故、逸脱の場合。</p>
          </div>
          <div className="exclusion-item">
            <span className="exclusion-number">②</span>
            <p>伝染病予防ワクチンの接種を受けない場合。</p>
          </div>
          <div className="exclusion-item">
            <span className="exclusion-number">③</span>
            <p>売買契約時、飼養者が疾病、傷病を了解の上で購入された場合。</p>
          </div>
          <div className="exclusion-item">
            <span className="exclusion-number">④</span>
            <p>保証請求に際して虚偽の申告があった場合。</p>
          </div>
          <div className="exclusion-item">
            <span className="exclusion-number">⑤</span>
            <p>子猫の病気・死亡時、直ちに当方まで連絡がされなかった場合。</p>
          </div>
          <div className="exclusion-item">
            <span className="exclusion-number">⑥</span>
            <p>保証は代猫の提供を行うものであって、治療費の保証及び金銭による保証は致しておりません。</p>
          </div>
          <div className="exclusion-item">
            <span className="exclusion-number">⑦</span>
            <p>代猫に相当する猫がいない場合、出産状況によりお待ち頂く場合も御座います。但し、代猫紹介開始後、６ヶ月を代猫保証の期限とさせて頂きます。</p>
          </div>
          <div className="exclusion-item">
            <span className="exclusion-number">⑧</span>
            <p>子猫お渡し後、成長過程において生じた変化（噛み合わせ・毛色・サイズ・睾丸など）が生じた場合。</p>
          </div>
          <div className="exclusion-item">
            <span className="exclusion-number">⑨</span>
            <p>FIPにつきましては、コロナウイルスの突然変異でおこりうる病気の為、飼い主さまが悪い訳でもブリーダーが悪い訳でも無い為こちらでの保証はございません。</p>
          </div>
        </div>

        <div className="investigation-rights">
          <p>当方は保障終了後も一カ月間、保証に関する調査権を有し、不正請求の事実が判明した時は代支給した猫の評価金額及びその調査・回収のために要した経費を飼い主様に対し請求できるものとします。</p>
        </div>
      </section>

      {/* お引き渡し際の書類 */}
      <section className="documents-section">
        <h2 className="section-title">📋 お引き渡し際に書類明細書</h2>
        <div className="documents-checklist">
          <div className="document-item">
            <div className="document-number">1</div>
            <span>生体契約書</span>
          </div>
          <div className="document-item">
            <div className="document-number">2</div>
            <span>ワクチン接種証明書（二回）</span>
          </div>
          <div className="document-item">
            <div className="document-number">3</div>
            <span>マイクロチップ接種証明書</span>
          </div>
          <div className="document-item">
            <div className="document-number">4</div>
            <span>両親遺伝子検査証明書（コピー件）</span>
          </div>
          <div className="document-item">
            <div className="document-number">5</div>
            <span>レントゲン検査二枚　診断書（短足のみ）</span>
          </div>
          <div className="document-item">
            <div className="document-number">6</div>
            <div className="document-details">
              <span>健康診断書</span>
              <div className="sub-items">
                <span>① 全部で15項目</span>
                <span>② 検便</span>
                <span>③ パルボウイルス検査</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 血統証明書 */}
      <section className="pedigree-section">
        <h2 className="section-title">📜 血統証明書類</h2>
        <div className="pedigree-info">
          <div className="pedigree-card">
            <h3>🏆 TICA</h3>
            <p>当舎はTICAとその傘下のCPA協会に登録しています。通常、去勢手術後（去勢証明書を提供）にCPAの血統書を申請し、子猫の飼い主に無料で郵送いたします。また、希望される場合は有料でTICAの血統書を申請することも可能です。</p>
          </div>
          <div className="pedigree-card">
            <h3>📋 CPA</h3>
            <p>当舎はTICAとその傘下のCPA協会に登録しています。通常、去勢手術後（去勢証明書を提供）にCPAの血統書を申請し、子猫の飼い主に無料で郵送いたします。また、希望される場合は有料でTICAの血統書を申請することも可能です。</p>
          </div>
        </div>
      </section>

      {/* ワクチンについて */}
      <section className="vaccine-section">
        <h2 className="section-title">💉 ワクチンについて</h2>
        <div className="vaccine-content">
          <div className="vaccine-intro">
            <p>私たちのワクチン接種は、<strong>2024年のWSAVA最新ワクチン接種ガイドライン</strong>に基づいています。</p>
          </div>
          
          <div className="vaccine-timeline">
            <div className="timeline-item">
              <div className="timeline-marker">1</div>
              <div className="timeline-content">
                <h4>生後6-8週</h4>
                <p>最初のワクチンを接種</p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-marker">2</div>
              <div className="timeline-content">
                <h4>3-4週間隔</h4>
                <p>第二回接種</p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-marker">3</div>
              <div className="timeline-content">
                <h4>再度3-4週間隔</h4>
                <p>第三回接種</p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-marker">4</div>
              <div className="timeline-content">
                <h4>6-12ヶ月齢の間</h4>
                <p>もう一度接種</p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-marker">∞</div>
              <div className="timeline-content">
                <h4>その後</h4>
                <p>3年ごとに一度接種</p>
              </div>
            </div>
          </div>

          <div className="vaccine-footer">
            <p>このスケジュールにより、子猫の健康を最適に保つことができます。</p>
          </div>
        </div>
      </section>

      {/* 最終メッセージ */}
      <div className="final-message">
        <p>🌟 子猫が10年以上健康にあなたと一緒にいるために、最初から最高の保証を提供します 🌟</p>
      </div>
    </div>
  );
};

export default HealthGuarantee;