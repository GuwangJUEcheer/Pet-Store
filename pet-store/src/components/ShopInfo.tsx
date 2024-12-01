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
          {<iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6455.775051962987!2d139.6638433!3d35.9986147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018c7c43859ce4d%3A0xaf6da7acb20b7b49!2s3536-2%20Kurohama%2C%20Hasuda%2C%20Saitama%20349-0101!5e0!3m2!1sen!2sjp!4v1733054949056!5m2!1sen!2sjp"
            width="600"
            height="400"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            title="Google Map"
          ></iframe>
          }
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
