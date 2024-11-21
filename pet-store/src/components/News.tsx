import React, { useState } from "react";
import "../css/News.css";

// 导入图片
import Cat1 from "../images/cat1.jpg";
import Cat2 from "../images/cat2.jpg";
import Cat3 from "../images/cat3.jpg";

const initialKittenData = [
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
  const [kittenData, setKittenData] = useState(initialKittenData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"add" | "edit" | "delete">("add");
  const [currentKitten, setCurrentKitten] = useState<any>(null);

  const handleAddKitten = () => {
    setModalType("add");
    setCurrentKitten({
      id: kittenData.length + 1,
      img: "",
      name: "",
      price: "",
      breed: "",
      gender: "",
      color: "",
      birthday: "",
    });
    setIsModalOpen(true);
  };

  const handleEditKitten = (kitten: any) => {
    setModalType("edit");
    setCurrentKitten(kitten);
    setIsModalOpen(true);
  };

  const handleDeleteKitten = (kitten: any) => {
    setModalType("delete");
    setCurrentKitten(kitten);
    setIsModalOpen(true);
  };

  const handleSaveKitten = () => {
    if (modalType === "add") {
      setKittenData((prevData) => [...prevData, currentKitten]);
    } else if (modalType === "edit") {
      setKittenData((prevData) =>
        prevData.map((kitten) =>
          kitten.id === currentKitten.id ? currentKitten : kitten
        )
      );
    }
    setIsModalOpen(false);
    setCurrentKitten(null);
  };

  const handleConfirmDelete = () => {
    setKittenData((prevData) =>
      prevData.filter((kitten) => kitten.id !== currentKitten.id)
    );
    setIsModalOpen(false);
    setCurrentKitten(null);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setCurrentKitten(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentKitten((prevKitten: any) => ({
      ...prevKitten,
      [name]: value,
    }));
  };

  return (
    <div className="news-container">
      <h1>最新子猫紹介</h1>
      <p className="subtitle">Kitten Info</p>

      <button className="add-button" onClick={handleAddKitten}>
        新しい子猫を追加
      </button>

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
              <div className="kitten-buttons">
                <button
                  className="edit-button"
                  onClick={() => handleEditKitten(kitten)}
                >
                  編集
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteKitten(kitten)}
                >
                  削除
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            {modalType === "delete" ? (
              <>
                <h2>本当に削除しますか？</h2>
                <p>{currentKitten.name}</p>
                <div className="modal-buttons">
                  <button onClick={handleConfirmDelete}>はい</button>
                  <button onClick={handleCancel}>いいえ</button>
                </div>
              </>
            ) : (
              <>
                <h2>{modalType === "add" ? "子猫情報を追加" : "子猫情報を編集"}</h2>
                <label>
                  名前：
                  <input
                    type="text"
                    name="name"
                    value={currentKitten.name}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  価格：
                  <input
                    type="text"
                    name="price"
                    value={currentKitten.price}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  猫種：
                  <input
                    type="text"
                    name="breed"
                    value={currentKitten.breed}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  性別：
                  <input
                    type="text"
                    name="gender"
                    value={currentKitten.gender}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  毛色：
                  <input
                    type="text"
                    name="color"
                    value={currentKitten.color}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  誕生日：
                  <input
                    type="date"
                    name="birthday"
                    value={currentKitten.birthday}
                    onChange={handleInputChange}
                  />
                </label>
                <div className="modal-buttons">
                  <button onClick={handleSaveKitten}>保存</button>
                  <button onClick={handleCancel}>キャンセル</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default News;
