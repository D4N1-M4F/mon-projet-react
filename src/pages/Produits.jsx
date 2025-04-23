import React, { useEffect, useState } from 'react';
import {
  Row, Col, Card, Tag, Checkbox, Slider, Input,
  Radio, Typography, Space, Grid
} from 'antd';
import { SearchOutlined, CheckOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Link } from 'react-router-dom';

const { Text } = Typography;
const { useBreakpoint } = Grid;
const API_BASE = 'http://localhost:5000';

const ProduitPage = () => {
  const screens = useBreakpoint();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/api/produits`);
        setProducts(data);
      } catch (err) {
        console.error("Erreur chargement produits :", err);
      }
    };
    fetch();
  }, []);

  const filters = [
    { label: "Populaire", description: "Le plus aimé" },
    { label: "Promo", description: "Actuellement en promotion" },
    { label: "Nouveau", description: "Nouveautés du mois" }
  ];

  const colors = ["Blanc", "Rose", "Doré"];
  const sizes = ["Petit", "Moyen", "Grand"];

  return (
    <div style={{ padding: screens.xs ? 16 : 24 }}>
      <Row gutter={[24, 24]}>
        {/* Colonne Filtres */}
        <Col xs={24} sm={24} md={8} lg={6}>
          <Card title="Mots-clés" style={{ marginBottom: 16 }}>
            <Space wrap>
              <Tag closable>Teint lumineux</Tag>
              <Tag closable>Hydratation</Tag>
            </Space>
          </Card>

          <Card title="Filtres" style={{ marginBottom: 16 }}>
            {filters.map((filter, index) => (
              <Checkbox key={index} style={{ display: 'block', marginBottom: 8 }}>
                <div>
                  <div>{filter.label}</div>
                  <Text type="secondary">{filter.description}</Text>
                </div>
              </Checkbox>
            ))}
          </Card>

          <Card title="Prix (€)" style={{ marginBottom: 16 }}>
            <Slider range defaultValue={[20, 80]} style={{ marginTop: 16 }} />
          </Card>

          <Card title="Couleur" style={{ marginBottom: 16 }}>
            {colors.map((color, index) => (
              <Checkbox key={index} style={{ display: 'block', marginTop: 8 }}>
                {color}
              </Checkbox>
            ))}
          </Card>

          <Card title="Taille">
            {sizes.map((size, index) => (
              <Checkbox key={index} style={{ display: 'block', marginTop: 8 }}>
                {size}
              </Checkbox>
            ))}
          </Card>
        </Col>

        {/* Colonne Produits dynamiques */}
        <Col xs={24} sm={24} md={16} lg={18}>
          <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
            <Col flex="auto" style={{ marginRight: 16 }}>
              <Input
                placeholder="Rechercher un produit..."
                prefix={<SearchOutlined />}
                style={{ width: '100%' }}
              />
            </Col>
            <Col>
              <Radio.Group defaultValue="New" buttonStyle="solid">
                <Radio.Button value="New"><CheckOutlined /> Nouveaux</Radio.Button>
                <Radio.Button value="PriceAsc">Prix ↑</Radio.Button>
                <Radio.Button value="PriceDesc">Prix ↓</Radio.Button>
                <Radio.Button value="Rating">Note</Radio.Button>
              </Radio.Group>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            {products.map((product) => (
              <Col xs={24} sm={12} md={12} lg={8} xl={8} key={product.id_Produit}>
                <Link to={`/produit/${product.id_Produit}`}>
                  <Card
                    hoverable
                    cover={
                      product.image ? (
                        <img
                          src={`${API_BASE}/uploads/${product.image}`}
                          alt={product.nom}
                          style={{ height: 200, objectFit: 'cover' }}
                        />
                      ) : (
                        <div style={{
                          height: 200,
                          backgroundColor: '#f0f0f0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Text type="secondary">Image produit</Text>
                        </div>
                      )
                    }
                  >
                    <Card.Meta title={product.nom} description={`${parseFloat(product.prix).toFixed(2)} $CAD`} />
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default ProduitPage;
