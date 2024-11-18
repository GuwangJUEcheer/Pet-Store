import React from 'react';
import '../css/News.css';

// 导入图片
import Cat1 from '../images/cat1.jpg';
import Cat2 from '../images/cat2.jpg';
import Cat3 from '../images/cat3.jpg';

const kittenData = [
  {
    id: 1,
    img: Cat1,
    name: "ちっちゃいけど元気",
    price: "250000円（税込）",
    breed: "ベンガル",
    gender: "男の子",
    color: "ブラウンスポッテッドタビー",
    birthday: "2024年10月05日",
  },
  {
    id: 2,
    img: Cat2,
    name: "茶色薄め",
    price: "260000円（税込）",
    breed: "ベンガル",
    gender: "女の子",
    color: "ブラウンスポッテッドタビー",
    birthday: "2024年10月05日",
  },
  {
    id: 3,
    img: Cat3,
    name: "ぴえん顔",
    price: "280000円（税込）",
    breed: "ベンガル",
    gender: "女の子",
    color: "ブラウンスポッテッドタビー",
    birthday: "2024年10月05日",
  },
];

const News: React.FC = () => {
  return (
    <div className="news-container">
      <h1>最新子猫紹介</h1>
      <p className="subtitle">Kitten Info</p>
      <div className="kitten-grid">
        {kittenData.map((kitten) => (
          <div key={kitten.id} className="kitten-card">
            <img src={kitten.img} alt={kitten.name} className="kitten-image" />
            <div className="kitten-info">
              <span className="status">ご予約受付中</span>
              <h2>{kitten.name}</h2>
              <p className="price">{kitten.price}</p>
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

export default News;
