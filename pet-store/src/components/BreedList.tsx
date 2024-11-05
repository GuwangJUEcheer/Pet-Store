// BreedList.tsx
import React from 'react';
import '../css/BreedList.css';
import breed01 from '../images/IMG_4890.jpeg';
import breed02 from '../images/IMG_4755.jpeg';
import breed03 from '../images/IMG_4764.jpeg';
import breed04 from '../images/IMG_4545.jpeg';
import breed05 from '../images/IMG_4140.jpeg';
import breed06 from '../images/IMG_4653.jpeg';

interface CatInfo {
  link: string;
  imageUrl: string;
  imageAlt: string;
  status: string;
  category: string;
  price: string;
  breed: string;
  gender: string;
  color: string;
  birthDate: string;
}

const catData: CatInfo[] = [
  {
    link: "https://cat-lounge.com/news/news-3660/",
    imageUrl: breed01,
    imageAlt: "中足短毛垂れ耳三毛の女の子スーパーおっとりちゃん",
    status: "ご予約受付中",
    category: "中足短毛垂れ耳三毛の女の子スーパーおっとりちゃん",
    price: "260000円（税込）",
    breed: "マンチカン",
    gender: "女の子",
    color: "ダイリュートキャリコ",
    birthDate: "2024年08月15日",
  },
  {
    link: "https://cat-lounge.com/news/news-3654/",
    imageUrl: breed02,
    imageAlt: "マンチカン短毛短足人気の薄い三毛猫ちゃん",
    status: "ご予約受付中",
    category: "マンチカン短毛短足人気の薄い三毛猫ちゃん😻",
    price: "380000円（税込）",
    breed: "マンチカン",
    gender: "女の子",
    color: "シルバーパッチドタビー＆ホワイト",
    birthDate: "2024年08月15日",
  },
  {
    link: "https://cat-lounge.com/news/news-3650/",
    imageUrl: breed03,
    imageAlt: "マンチカン長毛足長アメショの長毛みたいな見た目のイケメン男の子",
    status: "ご予約受付中",
    category: "マンチカン長毛足長アメショの長毛みたいな見た目のイケメン男の子",
    price: "220000円（税込）",
    breed: "マンチカン",
    gender: "男の子",
    color: "シルバータビー",
    birthDate: "2024年08月15日",
  },
  {
    link: "https://cat-lounge.com/news/news-3644/",
    imageUrl: breed04,
    imageAlt: "マンチカン長毛短足ぴえんなお顔の女の子🥺",
    status: "ご予約受付中",
    category: "マンチカン長毛短足ぴえんなお顔の女の子🥺",
    price: "350000円（税込）",
    breed: "マンチカン",
    gender: "女の子",
    color: "シルバーパッチドタビー＆ホワイト",
    birthDate: "2024年08月15日",
  },
  {
    link: "https://cat-lounge.com/news/news-3599/",
    imageUrl: breed05,
    imageAlt: "マンチカン足長長毛フワフワちゃん💜ブリティッシュロングヘアのような品のある見た目✨",
    status: "ご予約受付中",
    category: "マンチカン足長長毛フワフワちゃん💜ブリティッシュロングヘアのような品のある見た目✨",
    price: "270000円（税込）",
    breed: "マンチカン",
    gender: "女の子",
    color: "ブルー",
    birthDate: "2024年07月28日",
  },
  {
    link: "https://cat-lounge.com/news/news-3591/",
    imageUrl: breed06,
    imageAlt: "マンチカンミニマム姫長毛短足女の子👸",
    status: "ご予約受付中",
    category: "マンチカンミニマム姫長毛短足女の子👸",
    price: "400000円（税込）",
    breed: "マンチカン",
    gender: "女の子",
    color: "シルバータビー",
    birthDate: "2024年07月28日",
  }
];




const BreedList: React.FC = () => {
  return (
    <section className="breed block01">
      <h2 className="headline01"><span>最新子猫情報</span><span>What's new</span></h2>
      <ul>
        {catData.map((cat, index) => (
        <li key={index}>
          <a href={cat.link}></a>
          <div className="imgBox">
            <img
              width="1280"
              height="720"
              src={cat.imageUrl}
              alt={cat.imageAlt}
              loading="lazy"
            />
          </div>
          <div className="detail">
            <div className="status">
              <span>{cat.status}</span>
            </div>
            <div className="category">{cat.category}</div>
            <div className="price">
              {cat.price}
            </div>
          </div>
          <table className="detailTable">
            <tbody>
              <tr>
                <td>猫種：{cat.breed}</td>
              </tr>
              <tr>
                <td>性別：{cat.gender}</td>
              </tr>
              <tr>
                <td>毛色：{cat.color}</td>
              </tr>
              <tr>
                <td>誕生日：{cat.birthDate}</td>
              </tr>
            </tbody>
          </table>
        </li>
      ))}
      </ul>
      <div className="btn txtC">
        <a href="/news/">他の猫ちゃんはこちらから</a>
       </div> 
    </section>
  );
};

export default BreedList;
