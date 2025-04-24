
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Typography, Button, Divider, Card, List, Row, Col,
  Image, Tabs, Rate, InputNumber, Space, Spin
} from 'antd';
import axios from 'axios';
import { useCart } from '../components/contexts/cartcontext';

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const API_BASE = 'http://localhost:5000';

const ProduitInfo = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/api/produits/${id}`);
        setProduct(data);
      } catch (err) {
        console.error("Erreur chargement produit :", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <Spin style={{ display: 'block', margin: '40px auto' }} />;

  if (!product) return <Text type="danger">Produit introuvable.</Text>;

  const handleAddToCart = () => {
    const item = {
      id: product.id_Produit,
      name: product.nom,
      price: product.prix,
      stock: product.stock,
      image: product.image,
      quantity: quantity
    };
    addToCart(item);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <Row gutter={[32, 32]}>
        <Col xs={24} md={12}>
          <div style={{
            backgroundColor: '#f8f9fa',
            height: '500px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px'
          }}>
            <Image
              width="80%"
              src={product.image ? `${API_BASE}/uploads/${product.image}` : "https://via.placeholder.com/600x600"}
              alt={product.nom}
              preview={false}
            />
          </div>
        </Col>

        <Col xs={24} md={12}>
          <Title level={2}>{product.nom}</Title>
          <Title level={3} style={{ color: '#1890ff', marginTop: '8px' }}>
            {parseFloat(product.prix).toFixed(2)} $CAD
          </Title>

          <Divider />

          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <div>
              <Text strong>Quantité :</Text>
              <InputNumber
                min={1}
                max={product.stock}
                value={quantity}
                onChange={(value) => setQuantity(value)}
                style={{ marginLeft: '16px' }}
              />
            </div>

            <Button type="primary" size="large" block onClick={handleAddToCart}>
              Ajouter au panier
            </Button>

            <Button size="large" block disabled>
              Acheter maintenant
            </Button>
          </Space>

          <Divider />

          <Tabs defaultActiveKey="1">
            <TabPane tab="Description" key="1">
              <Text>{product.descriptions}</Text>
              <List
                dataSource={[
                  "Produit testé sous contrôle dermatologique",
                  "Emballage recyclable",
                  "Expédition rapide depuis nos entrepôts locaux"
                ]}
                renderItem={(item) => <List.Item>- {item}</List.Item>}
                style={{ marginTop: '16px' }}
              />
            </TabPane>
            <TabPane tab="Avis" key="2">
              <List
                itemLayout="horizontal"
                dataSource={[
                  { author: "Client fidèle", rating: 5, comment: "Excellent produit !", date: "01/04/2025" },
                  { author: "Naomie", rating: 4, comment: "J’aime beaucoup son effet lissant.", date: "27/03/2025" }
                ]}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      title={<Space><Rate disabled defaultValue={item.rating} /> {item.author}</Space>}
                      description={<>
                        <Text>{item.comment}</Text><br />
                        <Text type="secondary">{item.date}</Text>
                      </>}
                    />
                  </List.Item>
                )}
              />
            </TabPane>
          </Tabs>
        </Col>
      </Row>

      <Divider />

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <Text type="secondary">© 2025 SN Cosmétiques - Tous droits réservés</Text>
      </div>
    </div>
  );
};

export default ProduitInfo;
