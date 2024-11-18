// BreedList.tsx
import React from "react";
import "../css/BreedList.css";

// 导入图片
import ScottishFold from "../images/scottish.jpg";
import Munchkin from "../images/munchkin.jpg";
import Bengal from "../images/bengal.jpg";

const breedData = [
  {
    id: 1,
    img: ScottishFold,
    name: "スコティッシュフォールド",
    description:
      "優しい性格で家族向け。丸い顔と折れた耳が特徴です。静かな性格で他のペットとも相性が良いです。",
  },
  {
    id: 2,
    img: Munchkin,
    name: "マンチカン",
    description:
      "短い脚が特徴的な愛らしい猫種。活発で好奇心が旺盛。小さな体で家中を駆け回る姿が魅力です。",
  },
  {
    id: 3,
    img: Bengal,
    name: "ベンガル",
    description:
      "アクティブで遊び好き。野性的な模様が魅力で、水遊びも好きな珍しい猫種です。",
  },
];

const BreedList: React.FC = () => {
  return (
    <div className="breedlist-container">
      <h1>取扱猫種紹介</h1>
      <p className="subtitle">当店で扱っている猫種の特徴をご紹介します。</p>
      <div className="breed-grid">
        {breedData.map((breed) => (
          <div key={breed.id} className="breed-card">
            <img src={breed.img} alt={breed.name} className="breed-image" />
            <h2>{breed.name}</h2>
            <p>{breed.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BreedList;
