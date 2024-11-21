import React from "react";
import "../css/ShopInfo.css";

const ShopInfo: React.FC = () => {
  return (
    <div className="shopinfo-container">
      <h1 className="shopinfo-title">アドレス</h1>
      <p className="shopinfo-subtitle">アクセス方法をご案内します。</p>

      <div className="shopinfo-content">
        {/* 地图部分 */}
        <div className="shopinfo-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3238.578123456789!2d139.6611251!3d35.9945343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018c747d1bae411:0x85ad8395e7520b42!2sPUDO%20ステーション%20ウエルシア%20蓮田黒浜店!5e0!3m2!1sen!2sjp!4v1695833201467!5m2!1sen!2sjp"
            width="600"
            height="400"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            title="Google Map"
          ></iframe>
        </div>

        {/* 信息部分 */}
        <div className="shopinfo-details">
          <h2>交通手段</h2>
          <p>
            <strong>電車をご利用の方</strong>
            <br />
            JR「蓮田駅」東口から「蓮田市役所前」までバスで7分。そこから徒歩5分です。
            <br />
            ご希望であれば、蓮田駅東口から弊猫舎まで乗用車でお送りします。その際には駅への到着時間をお知らせください。
          </p>
          <p>
            <strong>車をご利用の方</strong>
            <br />
            駐車場についてのご説明をさせていただきますので車でお越しの際には、お問い合わせの際にお伝えください。
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShopInfo;
