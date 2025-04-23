import React from 'react';
import { Form, Input, InputNumber } from 'antd';

const InputField = ({ name, label, rules, type = 'text', ...rest }) => {
  return (
    <Form.Item name={name} label={label} rules={rules}>
      {type === 'number' ? (
        <InputNumber {...rest} style={{ width: '100%' }} />
      ) : type === 'textarea' ? (
        <Input.TextArea {...rest} />
      ) : (
        <Input {...rest} />
      )}
    </Form.Item>
  );
};

export default InputField;