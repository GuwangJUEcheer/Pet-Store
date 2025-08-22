// MainVisual.tsx
import React from 'react';
import {Carousel} from 'antd';
import '../css/MainVisual.css';

const MainVisual: React.FC = () => {
    return (
        <Carousel autoplay>
            <div className="slide">
                <img src="https://pet-store-bucket-2025.s3.ap-northeast-1.amazonaws.com/MV2.jpg" alt="Slide 1"/>
            </div>
            <div className="slide">
                <img src="https://pet-store-bucket-2025.s3.ap-northeast-1.amazonaws.com/MV2.jpg" alt="Slide 2"/>
            </div>
            {/* 添加其他滑动内容 */}
        </Carousel>
    );
};

export default MainVisual;
