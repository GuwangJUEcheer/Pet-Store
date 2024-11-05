// MainVisual.tsx
import React from 'react';
import { Carousel } from 'antd';
import '../css/MainVisual.css';
import mv2 from '../images/MV2.jpg'
import mv3 from '../images/MV3.jpg'

const MainVisual: React.FC = () => {
  return (
    <Carousel autoplay>
      <div className="slide">
        <img src={mv2} alt="Slide 1" />
      </div>
      <div className="slide">
        <img src={mv3} alt="Slide 2" />
      </div>
      {/* 添加其他滑动内容 */}
    </Carousel>
  );
};

export default MainVisual;
