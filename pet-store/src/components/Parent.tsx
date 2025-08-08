import React, {useEffect, useState} from "react";
import "../css/Parent.css";
import Milo from "../images/milo.jpg";
import Mochi from "../images/mochi.png";
import Milo1 from "../images/milo1.jpg";
import Milo2 from "../images/milo2.jpg";
import Mochi1 from "../images/mochi1.jpg";
import Mochi2 from "../images/mochi2.jpg";
import Kitten1 from "../images/ペンペン.jpg";
import Kitten2 from "../images/Toffee.jpg";
import Kitten3 from "../images/嘉嘉.jpg";
import Kitten4 from "../images/音音.png";
import Kitten5 from "../images/milk.jpg";
import Kitten6 from "../images/cream.jpg";
import Kitten7 from "../images/cheese.jpg";
import Kitten8 from "../images/butter.jpg";
import Kitten9 from "../images/こま.jpg";
import Kitten10 from "../images/VINCI.jpg";
import Kitten11 from "../images/メイ.jpg";
import Kitten12 from "../images/DB.jpg";
import Kitten13 from "../images/zm.jpg";
import Kitten14 from "../images/slw一.jpg";
import {getAllParentsUsingGet} from "../api/parentController";

// 父母猫数据
const parentData = [
    {
        id: 1,
        img: Milo,
        name: "Miloちゃん",
        breed: "Minuet (SL) ミヌエット",
        color: "Shaded Golden & White",
        relatedImages: [Milo, Milo1, Milo2],
    },
    {
        id: 2,
        img: Mochi,
        name: "もちちゃん",
        breed: "Minuet (SL) ミヌエット",
        color: "クリーム ホワイト",
        relatedImages: [Mochi, Mochi1, Mochi2],
    },
];


const Parent: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImages, setCurrentImages] = useState<string[]>([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [kittenData, setKittenData] = useState<API.Parent[]>()

    const fetchData = async () => {
        const response = await getAllParentsUsingGet();
        setKittenData(response.data ?? []);
    }

    useEffect(() => {
        void fetchData();
    }, []);

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

            <section className="parent-section">
                <div className="parent-row">
                    {kittenData && kittenData.map((parent) => (
                        <div
                            key={parent.id}
                            className="parent-card-horizontal parent-parent-card"
                        >
                            <img
                                src={parent.imgUrl}
                                alt={parent.name}
                                className="parent-image-horizontal"
                            />
                            <div className="parent-info-horizontal">
                                <h2>{parent.name}</h2>
                                <p>
                                    <strong>Breed:</strong> {parent.breed}
                                </p>
                                <p>
                                    <strong>Color:</strong> {parent.color}
                                </p>
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
