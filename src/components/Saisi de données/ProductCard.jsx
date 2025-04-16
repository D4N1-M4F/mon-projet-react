import React from 'react';
import { Card, Rate, Button, Tag, Space, Badge } from 'antd';
import { ShoppingCartOutlined, EyeOutlined, FireOutlined } from '@ant-design/icons';
import AddToCartButton from './AddToCartButton';

const { Meta } = Card;

const ProductCard = ({ product, onViewDetails, onAddToCart }) => {
    const isOutOfStock = product.stock <= 0;
    const isLowStock = product.stock > 0 && product.stock <= 5;

    return (
        <Badge.Ribbon 
            text={product.discount ? `-${product.discount}%` : null} 
            color="red"
            placement="start"
        >
            <Card
                hoverable
                style={{ 
                    width: '100%', 
                    marginBottom: '16px',
                    opacity: isOutOfStock ? 0.75 : 1
                }}
                cover={
                    <div style={{ position: 'relative' }}>
                        <img 
                            alt={product.name} 
                            src={product.image} 
                            style={{ 
                                height: '200px', 
                                width: '100%',
                                objectFit: 'cover',
                                cursor: 'pointer'
                            }} 
                            onClick={() => onViewDetails(product.id)}
                        />
                        {isOutOfStock && (
                            <Tag 
                                color="red"
                                style={{
                                    position: 'absolute',
                                    top: 10,
                                    right: 10,
                                    fontWeight: 'bold'
                                }}
                            >
                                RUPTURE
                            </Tag>
                        )}
                        {isLowStock && !isOutOfStock && (
                            <Tag 
                                color="orange"
                                icon={<FireOutlined />}
                                style={{
                                    position: 'absolute',
                                    top: 10,
                                    right: 10,
                                    fontWeight: 'bold'
                                }}
                            >
                                DERNIERS STOCKS
                            </Tag>
                        )}
                    </div>
                }
                actions={[
                    <AddToCartButton 
                        key="add-to-cart"
                        product={product} 
                        onAdd={onAddToCart}
                        disabled={isOutOfStock}
                    />,
                    <Button 
                        key="view-details"
                        type="link" 
                        icon={<EyeOutlined />}
                        onClick={() => onViewDetails(product.id)}
                    >
                        Détails
                    </Button>
                ]}
            >
                <Meta
                    title={product.name}
                    description={
                        <Space direction="vertical" size="small" style={{ width: '100%' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ 
                                    fontWeight: 'bold', 
                                    fontSize: '18px',
                                    color: product.discount ? '#f5222d' : '#1890ff'
                                }}>
                                    {product.discount ? (
                                        <>
                                            <span style={{ textDecoration: 'line-through', marginRight: 8 }}>
                                                {product.price} €
                                            </span>
                                            {Math.round(product.price * (1 - product.discount/100) * 100) / 100} €
                                        </>
                                    ) : (
                                        `${product.price} €`
                                    )}
                                </span>
                                <Rate 
                                    disabled 
                                    value={product.rating} 
                                    allowHalf 
                                    style={{ fontSize: 14 }} 
                                />
                            </div>
                            
                            {!isOutOfStock ? (
                                <div style={{ 
                                    color: isLowStock ? '#faad14' : '#52c41a',
                                    fontWeight: isLowStock ? 'bold' : 'normal'
                                }}>
                                    {isLowStock 
                                        ? `Derniers ${product.stock} en stock!` 
                                        : `En stock (${product.stock})`}
                                </div>
                            ) : (
                                <Button 
                                    type="link" 
                                    size="small"
                                    onClick={() => {/* Fonction pour alerte de réappro */}}
                                >
                                    Me prévenir quand disponible
                                </Button>
                            )}
                        </Space>
                    }
                />
            </Card>
        </Badge.Ribbon>
    );
};

export default ProductCard;