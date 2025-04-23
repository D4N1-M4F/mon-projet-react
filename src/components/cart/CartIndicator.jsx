import React from 'react';
import { Badge } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const CartIndicator = () => {
    const { itemsCount } = useCart();

    
    return (
        <Link to="/panier" style={{ color: 'white' }}>
            <Badge count={itemsCount} style={{ backgroundColor: '#52c41a' }}>
                <ShoppingCartOutlined style={{ fontSize: '20px' }} />
            </Badge>
        </Link>
    );
};

export default CartIndicator;