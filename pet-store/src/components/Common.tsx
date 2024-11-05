import React, { useState } from 'react';
import '../css/Header.css';

const ToggleMenu: React.FC = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <div>
      <div className={`toggleBtn ${isActive ? 'active' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      {isActive && <div className="gNav">...</div>}
    </div>
  );
};

export default ToggleMenu;
