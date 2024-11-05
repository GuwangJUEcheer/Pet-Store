// ScrollAnimation.tsx
import React, { useEffect } from 'react';
import '../css/ScrollAnimation.css';

const ScrollAnimation: React.FC = () => {
  useEffect(() => {
    const handleScroll = () => {
      document.querySelectorAll('.anim').forEach((element) => {
        const targetPos = (element as HTMLElement).offsetTop;
        const scroll = window.scrollY;
        const windowHeight = window.innerHeight;
        if (scroll > targetPos - windowHeight + windowHeight / 3) {
          element.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="scroll-container">
      <img src="/assets/images/kitten1.jpg" alt="Kitten 1" className="anim scroll-image" />
      <img src="/assets/images/kitten2.jpg" alt="Kitten 2" className="anim scroll-image" />
      {/* 添加更多内容或图片 */}
    </div>
  );
};

export default ScrollAnimation;
