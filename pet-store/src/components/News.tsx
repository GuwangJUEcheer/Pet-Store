import React, { useState, useEffect } from "react";
import { axiosInstance, axiosInstance2 } from "../Request/request";
import "../css/News.css";
import { message } from "antd";

// 定义子猫信息的类型
interface Kitten {
  id: number;
  name: string;
  price: number;
  gender: string;
  color: string;
  birthday: string;
  status: string;
  imgUrl: string | null;
}

const News: React.FC = () => {
  const formData = new FormData();

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      setIsAdmin(!!token); // 根据是否存在 token 判断管理员状态
      const endpoint = token ? "/api/kittens" : "/api/public/kittens";
      const response = await axiosInstance.get<Kitten[]>(endpoint);
      setKittenData(response.data);
      if(formData.get("img")!== null){
        formData.delete("img"); 
      }
    } catch (err) {
      setError("子猫情報を読み込めませんでした。");
      console.error("获取子猫信息失败:", err);
    } finally {
      setLoading(false);
      console.log(kittenData);
    }
  };
  const [kittenData, setKittenData] = useState<Kitten[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"add" | "edit" | "delete">("add");
  const [currentKitten, setCurrentKitten] = useState<Kitten | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false); // 是否为管理员
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  // 获取后端数据
  useEffect(() => {
    fetchData();
  }, []);

  const handleAddKitten = () => {
    setModalType("add");
    setCurrentKitten({
      id: 0,
      imgUrl: "",
      name: "",
      price: 0,
      gender: "",
      color: "",
      birthday: "",
      status: "予約受付中",
    });
    setIsModalOpen(true);
  };

  const chooseFile = async (e: any) => {
    if (e.target.files?.[0]) {
      formData.set("img", e.target.files[0]);
    }
  }
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

  const validateInputs = (): boolean => {
    if (!currentKitten) return false;

    const errors: { [key: string]: string } = {};
    if (!currentKitten.name.trim()) errors.name = "名前は必須です。";
    if (currentKitten.price <= 0) errors.price = "価格は正の数でなければなりません。";
    if (!["男の子", "女の子"].includes(currentKitten.gender)) errors.gender = "性別を選択してください。";
    if (!currentKitten.color.trim()) errors.color = "毛色は必須です。";
    if (new Date(currentKitten.birthday) > new Date()) errors.birthday = "誕生日は現在の日付より前である必要があります。";
    if (!currentKitten.status.trim()) errors.status = "状態は必須です。";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveKitten = async () => {
    if (!currentKitten || !validateInputs()) return;
    formData.set("kittenDvo", JSON.stringify(currentKitten));
    try {
      if (modalType === "add") {
        if(formData.get("img") === null){
          message.error("画像を選択してください。");
          return;
        }
        await axiosInstance2.post("test", formData);
        fetchData();
      } else if (modalType === "edit") {
        await axiosInstance2.post(`updateKitten`, formData);
        fetchData();
      }
      setIsModalOpen(false);
      setCurrentKitten(null);
      setValidationErrors({});
    } catch (err) {
      console.error("保存子猫信息失败:", err);
      setError("保存に失敗しました。");
    }
  };

  const handleConfirmDelete = async () => {
    if (!currentKitten) return;

    try {
      await axiosInstance.delete(`/api/kittens/${currentKitten.id}`);
      setKittenData((prevData) => prevData.filter((kitten) => kitten.id !== currentKitten.id));
      setIsModalOpen(false);
      setCurrentKitten(null);
    } catch (err) {
      setError("削除に失敗しました。");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setCurrentKitten(null);
    setValidationErrors({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentKitten((prevKitten) =>
      prevKitten
        ? {
          ...prevKitten,
          [name]: name === "price" ? parseFloat(value) || 0 : value,
        }
        : null
    );
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="news-container">
      <h1>最新子猫紹介</h1>
      <p className="subtitle">Kitten Info</p>

      {isAdmin && (
        <button className="add-button" onClick={() => handleAddKitten()}>
          新しい子猫を追加
        </button>
      )}

      <div className="kitten-grid">
        {kittenData.map((kitten) => (
          <div key={kitten.id} className="kitten-card">
            <img
              src={require(`../images/${kitten.imgUrl}`)}
              alt={kitten.name}
              className="kitten-image"
            />
            <div className="kitten-info">
              <h2>{kitten.name}</h2>
              <p className="price">価格: {kitten.price}円</p>
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
              {isAdmin && (
                <div className="kitten-buttons">
                  <button className="edit-button" onClick={() => handleEditKitten(kitten)}>
                    編集
                  </button>
                  <button className="delete-button" onClick={() => handleDeleteKitten(kitten)}>
                    削除
                  </button>
                </div>
              )}
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
                <p style={{ textAlign: "center" }}>{currentKitten?.name}</p>
                <div className="modal-buttons">
                  <button onClick={handleConfirmDelete}>はい</button>
                  <button onClick={handleCancel}>いいえ</button>
                </div>
              </>
            ) : (
              <>
                <h2>{modalType === "add" ? "子猫情報を追加" : "子猫情報を編集"}</h2>
                <div style={{ textAlign: "left" }}>
                  <label>
                    名前：
                    <input
                      type="text"
                      name="name"
                      value={currentKitten?.name || ""}
                      onChange={handleInputChange}
                    />
                    {validationErrors.name && <p className="error">{validationErrors.name}</p>}
                  </label>
                  <label>
                    価格：
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <input
                        type="text"
                        name="price"
                        value={currentKitten?.price.toString() || ""}
                        onChange={handleInputChange}
                        style={{ flex: 1 }}
                      />
                      <span style={{ marginLeft: "8px" }}>円</span>
                    </div>
                    {validationErrors.price && <p className="error">{validationErrors.price}</p>}
                  </label>
                  <label>
                    性別：
                    <div style={{ display: "flex", gap: "8px" }}>
                      <label>
                        <input
                          type="radio"
                          name="gender"
                          value="男の子"
                          checked={currentKitten?.gender === "男の子"}
                          onChange={handleInputChange}
                        />
                        男の子
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="gender"
                          value="女の子"
                          checked={currentKitten?.gender === "女の子"}
                          onChange={handleInputChange}
                        />
                        女の子
                      </label>
                    </div>
                    {validationErrors.gender && <p className="error">{validationErrors.gender}</p>}
                  </label>
                  <label>
                    毛色：
                    <input
                      type="text"
                      name="color"
                      value={currentKitten?.color || ""}
                      onChange={handleInputChange}
                    />
                    {validationErrors.color && <p className="error">{validationErrors.color}</p>}
                  </label>
                  <label>
                    誕生日：
                    <input
                      type="date"
                      name="birthday"
                      value={currentKitten?.birthday || ""}
                      onChange={handleInputChange}
                    />
                    {validationErrors.birthday && <p className="error">{validationErrors.birthday}</p>}
                  </label>
                  <label>
                    状態：
                    <div style={{ display: "flex", gap: "8px" }}>
                      <label>
                        <input
                          type="radio"
                          name="status"
                          value="予約受付中"
                          checked={currentKitten?.status === "予約受付中"}
                          onChange={handleInputChange}
                        />
                        予約受付中
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="status"
                          value="予約済み"
                          checked={currentKitten?.status === "予約済み"}
                          onChange={handleInputChange}
                        />
                        予約済み
                      </label>
                    </div>
                    {validationErrors.status && <p className="error">{validationErrors.status}</p>}
                  </label>
                  <label>
                    画像：
                    <input
                      type="file"
                      accept="image/*"
                      onChange={chooseFile}
                    />
                  </label>
                </div>
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

