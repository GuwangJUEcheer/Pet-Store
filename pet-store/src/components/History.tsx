import React from "react";
import "../css/History.css";

// 导入图片
import Cat1 from "../images/cat1.jpg";
import Cat2 from "../images/cat2.jpg";
import Cat3 from "../images/cat3.jpg";

const historyKittenImageGallery = [
  { id: 1, img: Cat1, alt: "Kitten 1" },
  { id: 2, img: Cat2, alt: "Kitten 2" },
  { id: 3, img: Cat3, alt: "Kitten 3" },
];

const History: React.FC = () => {
  return (
    <div className="history-page-container">
      <h1 className="history-page-title">過去子猫情報</h1>
      <p className="history-page-subtitle">Kitten Gallery</p>

      <div className="history-page-image-grid">
        {historyKittenImageGallery.map((kitten) => (
          <div key={kitten.id} className="history-page-image-card">
            <img
              src={kitten.img}
              alt={kitten.alt}
              className="history-page-image hover-zoom"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
