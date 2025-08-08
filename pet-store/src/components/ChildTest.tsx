import React, { useState } from 'react';

interface ChildComponentProps {
  value: string;
  onValueChange: (value: string) => void; 
}

const ChildComponent: React.FC<ChildComponentProps> = ({ value, onValueChange }) => {
  const [childValue, setChildValue] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setChildValue(newValue);
    onValueChange(newValue);
  };

  return (
    <div>
      <h2>子组件</h2>
      <p>父组件传递的值: {value}</p>
      <input
        type="text"
        value={childValue}
        onChange={handleInputChange}
        placeholder="向父组件传值"
      />
    </div>
  );
};

export default ChildComponent;
