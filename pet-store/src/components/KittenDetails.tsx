import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../Request/request";
import "../css/KittenDetails.css";

// 子猫信息类型
interface Kitten {
  id: number;
  name: string;
  price: number;
  gender: string;
  color: string;
  birthday: string;
  status: string;
}

// 父母猫信息类型
interface KittenParent {
  id: number;
  parentName: string;
  role: string;
  imgUrl: string;
  description: string;
}

const KittenDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // 状态管理
  const [kitten, setKitten] = useState<Kitten | null>(null);
  const [parents, setParents] = useState<KittenParent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [currentImage, setCurrentImage] = useState<string>(""); // 当前图片
  const [showModal, setShowModal] = useState<boolean>(false); // 控制弹窗显示
  const [selectedFiles, setSelectedFiles] = useState<{
    [key: string]: File | null;
  }>({});
  const [newImage, setNewImage] = useState<File | null>(null); // 新增图片文件
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // <-- 提前声明

  // 加载数据
  useEffect(() => {
    const fetchKittenDetails = async () => {
      try {
        const response = await axiosInstance.get(`/api/public/kittens/${id}`);
        setKitten(response.data);

        const imgResponse = await axiosInstance.get(
          `/api/public/kittens/${id}/images`
        );
        setImages(imgResponse.data);
        setCurrentImage(imgResponse.data[0]);
      } catch (err) {
        setError("詳細情報を取得できませんでした。");
        console.error("Error fetching kitten details:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchKittenParents = async () => {
      try {
        const response = await axiosInstance.get<KittenParent[]>(
          `/api/public/kittens/${id}/parents`
        );
        setParents(response.data);
      } catch (err) {
        console.error("Error fetching kitten parents:", err);
      }
    };

    fetchKittenDetails();
    fetchKittenParents();
  }, [id]);

  if (loading || error) {
    return (
      <div>
        {loading && <div>Loading...</div>}
        {error && <div>{error}</div>}
      </div>
    );
  }

  const handleImageClick = (img: string) => {
    setCurrentImage(img);
  };

  // 打开弹窗
  const openModal = () => {
    setShowModal(true);
  };

  // 关闭弹窗
  const closeModal = () => {
    setShowModal(false);
    setSelectedFiles({});
    setNewImage(null);
    setSelectedImage(null); // 清空图片预览
  };

  // 删除图片
  const handleDeleteImage = async (image: string) => {
    try {
      await axiosInstance.delete(`/api/kittens/images/${id}?imgUrl=${image}`);
      setImages(images.filter((img) => img !== image)); // 更新前端显示
      alert("画像が削除されました。");
    } catch (err) {
      console.error("画像の削除に失敗しました:", err);
      alert("削除に失敗しました。");
    }
  };

  // 新增图片
  const handleAddImage = async () => {
    if (!newImage) {
      alert("追加する画像を選択してください。");
      return;
    }

    const formData = new FormData();
    formData.append("img", newImage);

    try {
      await axiosInstance.post(`/api/kittens/images/${id}/add`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("画像が追加されました。");
      window.location.reload();
    } catch (err) {
      console.error("画像の追加に失敗しました:", err);
      alert("追加に失敗しました。");
    }
  };

  // 修改图片
  const handleUpdateImage = async (image: string) => {
    const file = selectedFiles[image];
    if (!file) {
      alert("変更する画像を選択してください。");
      return;
    }

    const formData = new FormData();
    formData.append("img", file);
    formData.append("oldImgUrl", image);

    try {
      await axiosInstance.post(`/api/kittens/images/${id}/update`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("画像が変更されました。");
      window.location.reload();
    } catch (err) {
      console.error("画像の変更に失敗しました:", err);
      alert("変更に失敗しました。");
    }
  };

  const handleFileChange = (
    image: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFiles({ ...selectedFiles, [image]: e.target.files[0] });
    }
  };

  const handleNewImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewImage(e.target.files[0]);
    }
  };

  const handlePreviewImage = (img: string) => {
    setSelectedImage(img); // 设置选中的图片
  };

  return (
    <div className="kitten-details-container">
      <button className="back-button" onClick={() => navigate("/news")}>
        &lt; 一覧に戻る
      </button>

      <div className="details-content">
        {/* 左侧图片展示区域 */}
        <div className="image-section">
          <img
            src={`/images/${currentImage}`}
            alt={kitten?.name}
            className="main-image"
          />
          <div className="thumbnail-container">
            {images.map((img, index) => (
              <img
                key={index}
                src={`/images/${img}`}
                alt={kitten?.name}
                className="thumbnail"
                onClick={() => handleImageClick(img)}
              />
            ))}
          </div>
          <button className="manage-button" onClick={openModal}>
            画像管理
          </button>
        </div>

        {/* 右侧详细信息区域 */}
        <div className="details-section">
          {/* 标题和价格 */}
          <h1>{kitten?.name}</h1>
          <p className="price">価格: {kitten?.price}円（税込）</p>

          {/* 子猫详细信息表格 */}
          <table className="details-table">
            <tbody>
              <tr>
                <td>猫種:</td>
                <td>ミヌエット</td>
              </tr>
              <tr>
                <td>性別:</td>
                <td>{kitten?.gender}</td>
              </tr>
              <tr>
                <td>毛色:</td>
                <td>{kitten?.color}</td>
              </tr>
              <tr>
                <td>誕生日:</td>
                <td>{kitten?.birthday}</td>
              </tr>
              <tr>
                <td>状態:</td>
                <td>{kitten?.status}</td>
              </tr>
            </tbody>
          </table>

          {/* 父母猫展示 */}
          <div className="parents-section">
            <h2>パパ・ママ紹介</h2>
            <div className="parents-container">
              {parents.map((parent) => (
                <div key={parent.id} className="parent-card">
                  <img
                    src={`/images/${parent.imgUrl}`}
                    alt={parent.parentName}
                    className="parent-image"
                  />
                  <h3>{parent.parentName}</h3>
                  <p>{parent.role === "father" ? "父猫" : "母猫"}</p>
                  <p>{parent.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 图片管理弹窗 */}
      {showModal && (
        <div className="modal">
          {/* 标题部分移入弹窗 */}
          <h2 className="modal-title">画像管理</h2>

          {/* 模态框内容区域 */}
          <div className="modal-content">
            {/* 图片管理模块 (可滚动) */}
            <div className="image-list">
              {images.map((img, index) => (
                <div key={index} className="image-item">
                  {/* 图片名称，点击显示预览 */}
                  <div className="image-header">
                    <span
                      className="image-name"
                      onClick={() => handlePreviewImage(img)}
                      style={{ cursor: "pointer" }}
                    >
                      {img}
                    </span>
                  </div>

                  {/* 操作区域 */}
                  <div className="image-actions">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(img, e)}
                    />
                    <div className="button-group">
                      <button
                        className="update-btn"
                        onClick={() => handleUpdateImage(img)}
                      >
                        変更
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteImage(img)}
                      >
                        削除
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 图片预览区域 */}
            <div className="image-preview">
              {selectedImage ? (
                <img
                  src={`/images/${selectedImage}`}
                  alt="Preview"
                  className="preview-image"
                />
              ) : (
                <p>画像を選択してください。</p>
              )}
            </div>
          </div>

          {/* 新增图片部分 */}
          <div className="add-section">
            <input
              type="file"
              accept="image/*"
              onChange={handleNewImageChange}
            />
            <button className="add-btn" onClick={handleAddImage}>
              追加
            </button>
          </div>

          {/* 关闭按钮移入弹窗 */}
          <div className="close-section">
            <button className="close-btn" onClick={closeModal}>
              閉じる
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default KittenDetails;
