import React, { useState } from "react";
import "../css/ShopInfo.css";
import certificate from "../images/certificate.jpg";

const ShopInfo: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const openModal = (image: string) => {
    setModalImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage("");
  };

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
          
          {/* 駐車場案内 */}
          <div className="parking-info">
            <h3>🚗 駐車場のご案内</h3>
            <p>
              駐車場の詳細な案内図をPDFでご用意しております。
              <br />
              お車でお越しの際は、事前にご確認いただけますようお願いいたします。
            </p>
            <div className="download-section">
              <a
                href="https://pet-store-bucket-2025.s3.ap-northeast-1.amazonaws.com/%E9%A7%90%E8%BB%8A%E6%A1%88%E5%86%85.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="download-button"
                download="駐車案内.pdf"
              >
                📄 駐車場案内をダウンロード
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 资格与执照 */}
      <section className="qualifications">
        <h2 className="room-title">資格 & 免許</h2>
        <div className="room-section">
          {/* 左侧图片 */}
          <div className="image-content">
            <img
              src={certificate}
              alt="Certification Document"
              className="certification-image"
              onClick={() => openModal(certificate)}
              style={{ cursor: "pointer" }}
            />
          </div>

          {/* 中间文字描述 */}
          <div className="text-content">
            <h3>資格</h3>
            <ul>
              <li>家庭動物管理士3級</li>
              <li>愛玩動物看護士</li>
              <li>動物飼養助手</li>
              <li>動物専門学校 看護コース卒業</li>
            </ul>
          </div>

          {/* 右侧文字描述 */}
          <div className="text-content">
            <h3>免許＆責任者</h3>
            <p>第一種動物取扱業　第71-0388号</p>
            <p>事業所の名称: Doria pet</p>
            <p>事業所の所在地: 運田市黒浜3536-2</p>
            <p>登録に動物取扱業の種別: 販売</p>
            <p>動物取扱責任者の氏名: 尾崎由倖</p>
            <p>登録の年月日: 令和5年3月22日</p>
            <p>有効期限の末日: 令和10年3月21日</p>
          </div>
        </div>
      </section>

      {/* 模态框 */}
      {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content">
            <img src={modalImage} alt="Enlarged" className="modal-image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopInfo;
