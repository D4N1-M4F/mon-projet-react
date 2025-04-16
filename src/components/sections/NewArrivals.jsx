import React from 'react';
import { Card, Button } from 'antd';

const NewArrivals = ({ products }) => {
  return (
    <div style={{ marginBottom: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
        {products.map((product) => (
          <Card
            key={product.id}
            hoverable
            style={{ width: 250, borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
            cover={<img alt={product.name} src={product.image} style={{ height: '200px', objectFit: 'cover' }} />}
          >
            <Card.Meta
              title={product.name}
              description={
                <>
                  <div style={{ margin: '8px 0', color: '#333', fontWeight: 'bold' }}>€{product.price}</div>
                  {product.oldPrice && (
                    <div style={{ textDecoration: 'line-through', color: '#999', fontSize: '14px' }}>
                      €{product.oldPrice}
                    </div>
                  )}
                </>
              }
            />
            <Button type="primary" style={{ marginTop: '10px', width: '100%', backgroundColor: '#1890ff', border: 'none' }}>
              Ajouter au panier
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NewArrivals;