import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/News.css";

// 定义子猫信息的类型
type Kitten = {
  id: number;
  img: string;
  name: string;
  price: string;
  breed: string;
  gender: string;
  color: string;
  birthday: string;
};

const News: React.FC = () => {
  const [kittenData, setKittenData] = useState<Kitten[]>([]); // 子猫数据
  const [isModalOpen, setIsModalOpen] = useState(false); // 控制模态框的显示
  const [modalType, setModalType] = useState<"add" | "edit" | "delete">("add");
  const [currentKitten, setCurrentKitten] = useState<Kitten | null>(null); // 当前操作的子猫
  const [loading, setLoading] = useState(true); // 数据加载状态
  const [error, setError] = useState<string | null>(null); // 错误信息

  // 获取后端数据
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Kitten[]>("http://localhost:8080/api/kittens");
        setKittenData(response.data);
        setLoading(false);
      } catch (err) {
        setError("子猫情報を読み込めませんでした。");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddKitten = () => {
    setModalType("add");
    setCurrentKitten({
      id: 0,
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

  const handleEditKitten = (kitten: Kitten) => {
    setModalType("edit");
    setCurrentKitten(kitten);
    setIsModalOpen(true);
  };

  const handleDeleteKitten = (kitten: Kitten) => {
    setModalType("delete");
    setCurrentKitten(kitten);
    setIsModalOpen(true);
  };

  const handleSaveKitten = async () => {
    if (!currentKitten) return;

    try {
      if (modalType === "add") {
        const response = await axios.post<Kitten>("http://localhost:8080/api/kittens", currentKitten);
        setKittenData((prevData) => [...prevData, response.data]);
      } else if (modalType === "edit") {
        await axios.put(`http://localhost:8080/api/kittens/${currentKitten.id}`, currentKitten);
        setKittenData((prevData) =>
          prevData.map((kitten) =>
            kitten.id === currentKitten.id ? currentKitten : kitten
          )
        );
      }
      setIsModalOpen(false);
      setCurrentKitten(null);
    } catch (err) {
      setError("保存に失敗しました。");
    }
  };

  const handleConfirmDelete = async () => {
    if (!currentKitten) return;

    try {
      await axios.delete(`http://localhost:8080/api/kittens/${currentKitten.id}`);
      setKittenData((prevData) =>
        prevData.filter((kitten) => kitten.id !== currentKitten.id)
      );
      setIsModalOpen(false);
      setCurrentKitten(null);
    } catch (err) {
      setError("削除に失敗しました。");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setCurrentKitten(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentKitten((prevKitten) => (prevKitten ? { ...prevKitten, [name]: value } : null));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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
                <button className="edit-button" onClick={() => handleEditKitten(kitten)}>
                  編集
                </button>
                <button className="delete-button" onClick={() => handleDeleteKitten(kitten)}>
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
                <p>{currentKitten?.name}</p>
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
                    value={currentKitten?.name || ""}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  価格：
                  <input
                    type="text"
                    name="price"
                    value={currentKitten?.price || ""}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  猫種：
                  <input
                    type="text"
                    name="breed"
                    value={currentKitten?.breed || ""}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  性別：
                  <input
                    type="text"
                    name="gender"
                    value={currentKitten?.gender || ""}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  毛色：
                  <input
                    type="text"
                    name="color"
                    value={currentKitten?.color || ""}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  誕生日：
                  <input
                    type="date"
                    name="birthday"
                    value={currentKitten?.birthday || ""}
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
