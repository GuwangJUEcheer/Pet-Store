import React, { useState, useEffect } from "react";
import axiosInstance from "../Request/request";
import "../css/News.css";

// 定义子猫信息的类型
interface Kitten {
  id: number;
  name: string;
  price: number; 
  gender: string; 
  color: string;
  birthday: string;
  status: string; 
  img_url: string | null;
}


const News: React.FC = () => {
  const [kittenData, setKittenData] = useState<Kitten[]>([]); // 子猫数据
  const [isModalOpen, setIsModalOpen] = useState(false); // 控制模态框的显示
  const [modalType, setModalType] = useState<"add" | "edit" | "delete">("add");
  const [currentKitten, setCurrentKitten] = useState<Kitten | null>(null); // 当前操作的子猫
  const [loading, setLoading] = useState(true); // 数据加载状态
  const [error, setError] = useState<string | null>(null); // 错误信息

  // 获取后端数据
  useEffect(() => {
    const fetchData = () => {
      axiosInstance
        .get<Kitten[]>("/api/kittens")
        .then((response) => {
          setKittenData(response.data); // 直接使用响应数据
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message || "子猫情報を読み込めませんでした。");
          setLoading(false);
        });
    };
    fetchData();
  }, []);
  
  const handleAddKitten = () => {
    setModalType("add");
    setCurrentKitten({
      id: 0,
      img_url: "",
      name: "",
      price: 0, // 修正为数字类型，符合数据库字段
      gender: "",
      color: "",
      birthday: "",
      status: "予約受付中",
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
        const response = await axiosInstance.post<Kitten>("/api/kittens", currentKitten);
        setKittenData((prevData) => [...prevData, response.data]);
      } else if (modalType === "edit") {
        await axiosInstance.put(`/api/kittens/${currentKitten.id}`, currentKitten);
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
      await axiosInstance.delete(`/api/kittens/${currentKitten.id}`);
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
    setCurrentKitten((prevKitten) => {
      if (prevKitten) {
        // 处理价格字段为数字类型
        const updatedValue = name === "price" ? parseFloat(value) || 0 : value;
        return { ...prevKitten, [name]: updatedValue };
      }
      return null;
    });
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
            <img src={kitten.img_url || "default.jpg"} alt={kitten.name} className="kitten-image" />
            <div className="kitten-info">
              <h2>{kitten.name}</h2>
              <p className="price">価格: ¥{kitten.price}</p>
              <table>
                <tbody>
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
                  <tr>
                    <td>状態：</td>
                    <td>{kitten.status}</td>
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
                    type="number"
                    name="price"
                    value={currentKitten?.price || 0}
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
                <label>
                  状態：
                  <input
                    type="text"
                    name="status"
                    value={currentKitten?.status || ""}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  画像URL：
                  <input
                    type="text"
                    name="img_url"
                    value={currentKitten?.img_url || ""}
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
}
 
export default News;
