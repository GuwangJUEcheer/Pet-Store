import React, { useEffect, useState } from 'react';
import ChildTest from './ChildTest';

const ParentTest: React.FC = () => {

  const [parentValue, setParentValue] = useState<string>('Test By Father');
  const [childValue, setChildValue] = useState<string>('');

  const handleChildValueChange = (value: string) => {
    setChildValue(value);
  };

  return (
    <div>
      <h1>父组件</h1>
      <p>子组件传递的值: {childValue}</p>
      <ChildTest
        value={parentValue}
        onValueChange={handleChildValueChange}
      />
    </div>
  );
};

export default ParentTest;
