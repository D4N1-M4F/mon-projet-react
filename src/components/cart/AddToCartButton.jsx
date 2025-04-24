import React from 'react';
import { Button, Tooltip } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useCart } from '../contexts/cartcontext';

const AddToCartButton = ({ product, compact = false }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <Tooltip title="Ajouter au panier">
      <Button
        type={compact ? 'text' : 'primary'}
        icon={<ShoppingCartOutlined />}
        onClick={handleAddToCart}
      >
        {!compact && 'Ajouter au panier'}
      </Button>
    </Tooltip>
  );
};

export default AddToCartButton;
