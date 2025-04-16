import React from 'react';
import { Input } from 'antd';

const InputField = ({ placeholder, value, onChange }) => {
  return <Input placeholder={placeholder} value={value} onChange={onChange} />;
};

export default InputField;
