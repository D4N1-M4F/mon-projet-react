import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';

const Categories = ({ categories }) => {
  return (
    <div style={{ marginBottom: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
        {categories.map((category) => (
          <Card
            key={category.id}
            hoverable
            style={{ width: 200, borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', textAlign: 'center' }}
            cover={<img alt={category.name} src={category.image} style={{ height: '150px', objectFit: 'cover' }} />}
          >
            <Link
              to={`/categories/${category.id}`}
              style={{ fontWeight: 'bold', fontSize: '16px', color: '#1890ff', textDecoration: 'none' }}
            >
              {category.name}
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Categories;