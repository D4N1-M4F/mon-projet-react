import React, { useState } from 'react';
import { 
  Layout, Menu, Button, Card, Row, Col, Typography, Tag, Space, 
  Badge, Input, Select, Avatar, message, Slider, Checkbox, Divider, Dropdown 
} from 'antd';
import { 
  UserOutlined, ShoppingCartOutlined, SearchOutlined,
  DownOutlined, HeartOutlined, StarOutlined, FilterOutlined,
  LoginOutlined, UserAddOutlined 
} from '@ant-design/icons';
import 'antd/dist/reset.css';

const { Header, Content, Footer, Sider } = Layout;
const { Title, Text } = Typography;

// Données des produits
const productsData = [
  { 
    id: 1,
    name: "Titi White", 
    description: "Soin éclaircissant premium pour un teint radieux", 
    price: 45,
    discountPrice: 39,
    tag: "Nouveau",
    category: "visage",
    color: "blanc",
    rating: 4.5,
    image: "https://via.placeholder.com/300x200?text=Titi+White"
  },
  { 
    id: 2,
    name: "Gels Douches Comant VeelGold", 
    description: "Nettoyant doux et parfumé pour le corps", 
    price: 35,
    tag: "Populaire",
    category: "corps",
    color: "doré",
    rating: 4.2,
    image: "https://via.placeholder.com/300x200?text=Gels+Douches"
  },
  { 
    id: 3,
    name: "Sérums Vaseline GlutaGlow", 
    description: "Éclat immédiat pour une peau lumineuse", 
    price: 25,
    category: "visage",
    color: "rose",
    rating: 4.7,
    image: "https://via.placeholder.com/300x200?text=Serum+Vaseline" 
  },
  { 
    id: 4,
    name: "Lotions Vaseline Intensive Care", 
    description: "Hydratation intense 48h pour peau sèche", 
    price: 25,
    tag: "Bestseller",
    category: "corps",
    color: "bleu",
    rating: 4.8,
    image: "https://via.placeholder.com/300x200?text=Lotion+Vaseline"
  },
  { 
    id: 5,
    name: "Gamme Healthy Glow", 
    description: "Routine complète pour une peau saine", 
    price: 75,
    category: "ensemble",
    color: "vert",
    rating: 4.9,
    image: "https://via.placeholder.com/300x200?text=Healthy+Glow" 
  },
  { 
    id: 6,
    name: "Crème Nuit Régénérante", 
    description: "Reparateur intense pour régénération nocturne", 
    price: 55,
    tag: "Nouveau",
    category: "visage",
    color: "noir",
    rating: 4.6,
    image: "https://via.placeholder.com/300x200?text=Creme+Nuit" 
  },
];

const Gammes = () => {
  // Couleurs disponiblesconst [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOption] = useState('popular');
  const [searchQuery] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [priceRange] = useState([0, 100]);
  const [selectedColors, ] = useState([]);
    const [selectedCategory] = useState('all');

  // Fonction pour filtrer et trier les produits
  const filterProducts = () => {
    let filtered = [...productsData];
    
    // Filtre par catégorie
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Filtre par recherche
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filtre par prix
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Filtre par couleur
    if (selectedColors.length > 0) {
      filtered = filtered.filter(product => 
        selectedColors.includes(product.color)
      );
    }
    
    // Tri des produits
    switch(sortOption) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      default: // 'popular'
        filtered.sort((a, b) => (b.tag ? 1 : 0) - (a.tag ? 1 : 0));
    }
    
    return filtered;
  };

  // Gestion des couleurs des tags
  const getTagColor = (tag) => {
    switch(tag) {
      case 'Nouveau': return 'blue';
      case 'Populaire': return 'magenta';
      case 'Bestseller': return 'gold';
      default: return 'green';
    }
  };

  // Ajouter au panier
  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
    message.success(`${product.name} ajouté au panier`);
  };

 

  return (
    <Layout className="layout" style={{ minHeight: '100vh',paddingTop : 'var(--navbar-height)'  }}>
      {/* Barre de Navigation fixe */}
   
  
      {/* Contenu de la page */}
      <Content style={{ padding: '50px 20px', marginTop: 64 }}>
        <Row gutter={[16, 16]}>
          {/* Liste des produits */}
          {filterProducts().map(product => (
            <Col key={product.id} span={8}>
              <Card
                hoverable
                cover={<img alt={product.name} src={product.image} />}
                actions={[
                  <Button 
                    type="link" 
                    icon={<HeartOutlined />} 
                    size="large"
                  />,
                  <Button 
                    type="link" 
                    icon={<StarOutlined />} 
                    size="large"
                  />,
                  <Button 
                    type="link" 
                    icon={<ShoppingCartOutlined />} 
                    size="large" 
                    onClick={() => addToCart(product)}
                  />
                ]}
              >
                <Card.Meta 
                  title={product.name}
                  description={<Text>{product.description}</Text>}
                />
                <div style={{ marginTop: 10 }}>
                  <Tag color={getTagColor(product.tag)}>{product.tag}</Tag>
                  <div style={{ marginTop: 10 }}>
                    <Text style={{ textDecoration: 'line-through', marginRight: 10 }}>
                      ${product.price}
                    </Text>
                    <Text strong style={{ color: '#ff4d4f' }}>
                      ${product.discountPrice || product.price}
                    </Text>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Content>

      {/* Footer */}
      <Footer style={{ textAlign: 'center' }}>
        SN Beauty ©2025
      </Footer>
    </Layout>
  );
};

export default Gammes;
