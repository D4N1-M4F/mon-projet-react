import React from 'react';
import { Card as AntCard } from 'antd';

const Card = ({ title, content }) => {
  return (
    <AntCard title={title} style={{ width: 300 }}>
      <p>{content}</p>
    </AntCard>
  );
};

export default Card;
