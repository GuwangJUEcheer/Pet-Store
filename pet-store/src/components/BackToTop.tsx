// BackToTop.tsx
import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { UpOutlined } from '@ant-design/icons';
import '../css/BackToTop.css';

const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <Button
      className={`back-to-top ${visible ? 'visible' : ''}`}
      onClick={scrollToTop}
      icon={<UpOutlined />}
    />
  );
};

export default BackToTop;
