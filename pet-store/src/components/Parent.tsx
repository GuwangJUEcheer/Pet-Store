import React from "react";
import "../css/Parent.css";
import Milo from "../images/milo.jpg";
import Mochi from "../images/mochi.png";

// 父母猫数据
const parentData = [
  {
    id: 1,
    img: Milo, // 替换为实际图片地址
    name: "Miloちゃん",
    role: "Father",
    breed: "Minuet (SL) ミヌエット",
    color: "Shaded Golden & White",
  },
  {
    id: 2,
    img: Mochi, // 替换为实际图片地址
    name: "もちちゃん",
    role: "Father",
    breed: "Minuet (SL) ミヌエット",
    color: "クリーム ホワイト",
  },
];

const BreedList: React.FC = () => {
  return (
    <div className="parentlist-container">
      <h1>親猫ちゃん</h1>
      <p className="subtitle">子猫たちの素敵な親猫をご紹介します。</p>
      <div className="parent-grid">
        {parentData.map((parent) => (
          <div key={parent.id} className="parent-card">
            <img src={parent.img} alt={parent.name} className="parent-image" />
            <h2>{parent.name}</h2>
            <p><strong>Breed:</strong> {parent.breed}</p>
            <p><strong>Color:</strong> {parent.color}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BreedList;
