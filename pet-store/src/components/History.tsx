import React from "react";
import "../css/History.css";

// 导入图片
import Cat1 from "../images/cat1.jpg";
import Cat2 from "../images/cat2.jpg";
import Cat3 from "../images/cat3.jpg";

const kittenHistoryData = [
  {
    id: 1,
    img: Cat1,
    name: "みんなの人気者",
    price: "お迎え済み",
    breed: "スコティッシュフォールド",
    gender: "男の子",
    color: "クリームタビー",
    birthday: "2023年5月15日",
  },
  {
    id: 2,
    img: Cat2,
    name: "優しいお姉さん",
    price: "お迎え済み",
    breed: "ラグドール",
    gender: "女の子",
    color: "ブルーポイント",
    birthday: "2023年3月22日",
  },
  {
    id: 3,
    img: Cat3,
    name: "元気いっぱい",
    price: "お迎え済み",
    breed: "アメリカンショートヘア",
    gender: "男の子",
    color: "シルバーパッチドタビー",
    birthday: "2023年1月10日",
  },
];

const History: React.FC = () => {
  return (
    <div className="history-container">
      <h1>過去子猫紹介</h1>
      <p className="subtitle">Kitten History</p>
      <div className="kitten-grid">
        {kittenHistoryData.map((kitten) => (
          <div key={kitten.id} className="kitten-card">
            <img src={kitten.img} alt={kitten.name} className="kitten-image" />
            <div className="kitten-info">
              <span className="status">{kitten.price}</span>
              <h2>{kitten.name}</h2>
              <table>
                <tbody>
                  <tr>
                    <td>猫種：</td>
                    <td>{kitten.breed}</td>
                  </tr>
                  <tr>
                    <td>性別：</td>
                    <td>{kitten.gender}</td>
                  </tr>
                  <tr>
                    <td>毛色：</td>
                    <td>{kitten.color}</td>
                  </tr>
                  <tr>
                    <td>誕生日：</td>
                    <td>{kitten.birthday}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
