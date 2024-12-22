import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../Request/request";
import "../css/KittenDetails.css";

interface Kitten {
  id: number;
  name: string;
  price: number;
  gender: string;
  color: string;
  birthday: string;
  status: string;
}

interface KittenParent {
  id: number;
  parentName: string;
  role: string; // "father" or "mother"
  imgUrl: string;
  description: string;
}

const KittenDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [kitten, setKitten] = useState<Kitten | null>(null);
  const [parents, setParents] = useState<KittenParent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [currentImage, setCurrentImage] = useState<string>("");

  useEffect(() => {
    const fetchKittenDetails = async () => {
      try {
        // 获取子猫详细信息
        const response = await axiosInstance.get(`/api/public/kittens/${id}`);
        setKitten(response.data);

        // 获取子猫图片
        const imgResponse = await axiosInstance.get(
          `/api/public/kittens/${id}/images`
        );
        setImages(imgResponse.data);
        setCurrentImage(imgResponse.data[0]); // 默认显示第一张图片
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const handleImageClick = (img: string) => {
    setCurrentImage(img);
  };

  return (
    <div className="kitten-details-container">
      {/* 返回按钮 */}
      <button className="back-button" onClick={() => navigate("/news")}>
        &lt; 一覧に戻る
      </button>

      <div className="details-content">
        {/* 图片展示 */}
        <div className="image-section">
          {/* 大图显示 */}
          <img
            src={`/images/${currentImage}`}
            alt={kitten?.name}
            className="main-image"
            onError={(e) => (e.currentTarget.src = "/images/cat1.jpg")}
          />

          {/* 小图展示 */}
          <div className="thumbnail-container">
            {images.map((img, index) => (
              <img
                key={index}
                src={`/images/${img}`}
                alt={kitten?.name}
                className="thumbnail"
                onClick={() => handleImageClick(img)}
                onError={(e) => (e.currentTarget.src = "/images/cat1.jpg")}
              />
            ))}
          </div>
        </div>

        {/* 详细信息 */}
        <div className="details-section">
          <h1>{kitten?.name}</h1>
          <p className="price">{kitten?.price}円（税込）</p>
          <table className="details-table">
            <tbody>
              <tr>
                <th>性別</th>
                <td>{kitten?.gender}</td>
              </tr>
              <tr>
                <th>毛色</th>
                <td>{kitten?.color}</td>
              </tr>
              <tr>
                <th>誕生日</th>
                <td>{kitten?.birthday}</td>
              </tr>
              <tr>
                <th>状態</th>
                <td>{kitten?.status}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 父母信息展示 */}
      <div className="parents-section">
        <h2 className="parents-title">パパ・ママ紹介</h2>
        <div className="parents-container">
          {parents.map((parent) => (
            <div key={parent.id} className="parent-card">
              <div className="parent-card-inner">
                <img
                  src={parent.imgUrl}
                  alt={parent.parentName}
                  className="parent-image"
                />
                <div className="parent-info">
                  <h3 className="parent-name">{parent.parentName}</h3>
                  <p className="parent-role">
                    {parent.role === "father" ? "パパ" : "ママ"}
                  </p>
                  <p className="parent-description">{parent.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KittenDetails;
