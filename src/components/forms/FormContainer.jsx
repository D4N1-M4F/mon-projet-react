import React from 'react';
import { Form } from 'antd';

const FormContainer = ({ children, onFinish }) => {
  return (
    <Form layout="vertical" onFinish={onFinish}>
      {children}
    </Form>
  );
};

export default FormContainer;
