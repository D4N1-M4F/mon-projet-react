import React from 'react';
import { Card, Button } from 'antd';

const ProductByGamme = ({ gammes }) => {
  return (
    <div style={{ marginBottom: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
        {gammes.map((gamme) => (
          <Card
            key={gamme.id}
            hoverable
            style={{ width: 250, borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
            cover={<img alt={gamme.name} src={gamme.image} style={{ height: '200px', objectFit: 'cover' }} />}
          >
            <Card.Meta title={<div style={{ fontWeight: 'bold' }}>{gamme.name}</div>} />
            <Button
              type="primary"
              style={{ marginTop: '10px', width: '100%', backgroundColor: '#1890ff', border: 'none' }}
            >
              Voir les produits
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductByGamme;