import React from 'react';
import { 
  Typography, 
  Button, 
  Divider, 
  Card, 
  List, 
  Row, 
  Col, 
  Image, 
  Tabs, 
  Rate,
  InputNumber,
  Space 
} from 'antd';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const product = {
  name: "Sérum Éclat Professionnel",
  price: "35€",
  description: "Un sérum révolutionnaire pour un teint éclatant et uniforme. Formule enrichie en vitamine C et acide hyaluronique.",
  features: [
    "Riche en antioxydants",
    "Texture légère et non grasse",
    "Convient à tous les types de peau",
    "Fabriqué en France"
  ],
  reviews: [
    { author: "Marie D.", rating: 5, comment: "Produit exceptionnel, ma peau n'a jamais été aussi belle !", date: "15/03/2025" },
    { author: "Sophie T.", rating: 4, comment: "Très bon produit, légère odeur au début mais qui disparaît vite", date: "02/02/2025" },
  ]
};

const Produits = () => {
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
              src="https://via.placeholder.com/600x600"
              alt={product.name}
              preview={false}
            />
          </div>
        </Col>
        
        <Col xs={24} md={12}>
          <Title level={2}>{product.name}</Title>
          <Title level={3} style={{ color: '#1890ff', marginTop: '8px' }}>{product.price}</Title>
          
          <Divider />
          
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <div>
              <Text strong>Quantité :</Text>
              <InputNumber min={1} max={10} defaultValue={1} style={{ marginLeft: '16px' }} />
            </div>
            
            <Button type="primary" size="large" block>
              Ajouter au panier
            </Button>
            
            <Button size="large" block>
              Acheter maintenant
            </Button>
          </Space>
          
          <Divider />
          
          <Tabs defaultActiveKey="1">
            <TabPane tab="Description" key="1">
              <Text>{product.description}</Text>
              <List
                dataSource={product.features}
                renderItem={item => <List.Item>- {item}</List.Item>}
                style={{ marginTop: '16px' }}
              />
            </TabPane>
            <TabPane tab="Avis" key="2">
              <List
                itemLayout="horizontal"
                dataSource={product.reviews}
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

export default Produits;