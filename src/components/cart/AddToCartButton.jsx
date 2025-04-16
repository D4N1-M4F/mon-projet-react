import React from 'react';
import { Button, Tooltip, message } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

// Props attendus : product (objet), compact (booléen)
const AddToCartButton = ({ product, compact = false }) => {
  const handleAddToCart = () => {
    // Simule l'ajout (à remplacer avec state global / localStorage)
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = [...cart, { ...product, quantity: 1 }];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    message.success(`${product.name} ajouté au panier`);
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
