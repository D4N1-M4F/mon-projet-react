import React from 'react';
import { Button as AntButton } from 'antd';

const Button = ({ type = "primary", children, onClick }) => {
  return <AntButton type={type} onClick={onClick}>{children}</AntButton>;
};

export default Button;
