import React, {useEffect, useState} from "react";
import "../css/Parent.css";
import {getAllParentsUsingGet} from "../api/parentController";
import {Image} from "antd";


const Parent: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImages, setCurrentImages] = useState<string[]>([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [allParents, setAllParents] = useState<API.Parent[]>([])

    const fetchData = async () => {
        const response = await getAllParentsUsingGet();
        setAllParents(response.data ?? []);
    }

    useEffect(() => {
        void fetchData();
    }, []);

    // Separate parents by gender
    const papaCats = allParents.filter(parent => parent.gender === '父');
    const mamaCats = allParents.filter(parent => parent.gender === '母');

    const openModal = (images: string[]) => {
        setCurrentImages(images);
        setCurrentImageIndex(0);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentImages([]);
        setCurrentImageIndex(0);
    };

    const handleNext = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % currentImages.length);
    };

    const handlePrev = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? currentImages.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="parentlist-container">
            {/* 标题部分 */}
            <header>
                <h1>親猫ちゃん</h1>
                <p className="subtitle">子猫たちの素敵な親猫をご紹介します。</p>
            </header>

            {/* パパ猫セクション */}
            <section className="parent-section">
                <h2 className="section-title">🐾 パパたち</h2>
                <div className="parent-row">
                    {papaCats.map((papa) => (
                        <div key={papa.id} className="parent-card-horizontal parent-parent-card">
                            <div className="parent-image-container">
                                <Image
                                    src={papa.imgUrl}
                                    alt={papa.name}
                                    className="parent-image-horizontal"
                                    preview={true}
                                />
                            </div>
                            <div className="parent-info-horizontal">
                                <h2>{papa.name}</h2>
                                <p><strong>Breed:</strong> {papa.breed}</p>
                                <p><strong>Color:</strong> {papa.color}</p>
                                <div className="genetic-testing-section">
                                    <p><strong>遺伝子検査結果:</strong></p>
                                    <div className="genetic-list">
                                        <span className="genetic-item">α-マンノシドーシス ✅クリア</span>
                                        <span className="genetic-item">多発性嚢胞腎（PKD） ✅クリア</span>
                                        <span className="genetic-item">ピルビン酸キナーゼ欠乏症（PK Deficiency） ✅クリア</span>
                                        <span className="genetic-item">進行性網膜萎縮症 -b（PRA-b） ✅クリア</span>
                                        <span className="genetic-item">肥大型心筋症 -MC（HCM-MC） ✅クリア</span>
                                        <span className="genetic-item">肥大型心筋症 -RD （HCM-RD） ✅クリア</span>
                                    </div>
                                </div>
                                {papa.description && (
                                    <p><strong>Description:</strong> {papa.description}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ママ猫セクション */}
            <section className="parent-section">
                <h2 className="section-title">💕 ママたち</h2>
                <div className="parent-row">
                    {mamaCats.map((mama) => (
                        <div key={mama.id} className="parent-card-horizontal parent-parent-card">
                            <div className="parent-image-container">
                                <Image
                                    src={mama.imgUrl}
                                    alt={mama.name}
                                    className="parent-image-horizontal"
                                    preview={true}
                                />
                            </div>
                            <div className="parent-info-horizontal">
                                <h2>{mama.name}</h2>
                                <p><strong>Breed:</strong> {mama.breed}</p>
                                <p><strong>Color:</strong> {mama.color}</p>
                                <div className="genetic-testing-section">
                                    <p><strong>遺伝子検査結果:</strong></p>
                                    <div className="genetic-list">
                                        <span className="genetic-item">α-マンノシドーシス ✅クリア</span>
                                        <span className="genetic-item">多発性嚢胞腎（PKD） ✅クリア</span>
                                        <span className="genetic-item">ピルビン酸キナーゼ欠乏症（PK Deficiency） ✅クリア</span>
                                        <span className="genetic-item">進行性網膜萎縮症 -b（PRA-b） ✅クリア</span>
                                        <span className="genetic-item">肥大型心筋症 -MC（HCM-MC） ✅クリア</span>
                                        <span className="genetic-item">肥大型心筋症 -RD （HCM-RD） ✅クリア</span>
                                    </div>
                                </div>
                                {mama.description && (
                                    <p><strong>Description:</strong> {mama.description}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/*<section className="kitten-section">*/}
            {/*    <div className="kitten-grid">*/}
            {/*        {kittenData && kittenData.map((kitten) => (*/}
            {/*            <div key={kitten.id} className="kitten-card parent-kitten-card">*/}
            {/*                <img*/}
            {/*                    src={kitten.imgUrl}*/}
            {/*                    alt={kitten.name}*/}
            {/*                    className="kitten-image"*/}
            {/*                />*/}
            {/*                <div className="kitten-overlay">*/}
            {/*                    {(kitten?.description ?? "").split("\n").map((line, index) => (*/}
            {/*                        <React.Fragment key={index}>*/}
            {/*                            {line}*/}
            {/*                            <br/>*/}
            {/*                        </React.Fragment>*/}
            {/*                    ))}*/}
            {/*                </div>*/}
            {/*                <h3 className="kitten-name">{kitten.name}</h3>*/}
            {/*            </div>*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*</section>*/}

            {/* 弹窗部分 */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
            <span className="modal-close" onClick={closeModal}>
              &times;
            </span>
                        <div className="modal-navigation">
                            {currentImageIndex > 0 && (
                                <span className="modal-arrow left-arrow" onClick={handlePrev}>
                  &#8249;
                </span>
                            )}
                            <img
                                src={currentImages[currentImageIndex]}
                                alt="Parent"
                                className="modal-image"
                            />
                            {currentImageIndex < currentImages.length - 1 && (
                                <span className="modal-arrow right-arrow" onClick={handleNext}>
                  &#8250;
                </span>
                            )}
                        </div>
                        <p className="modal-index">
                            {currentImageIndex + 1} / {currentImages.length}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Parent;
