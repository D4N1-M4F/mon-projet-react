import React from 'react';
import { Select } from 'antd';

const SelectField = ({ options, onChange }) => {
  return (
    <Select style={{ width: 200 }} onChange={onChange}>
      {options.map((opt) => (
        <Select.Option key={opt.value} value={opt.value}>
          {opt.label}
        </Select.Option>
      ))}
    </Select>
  );
};

export default SelectField;
