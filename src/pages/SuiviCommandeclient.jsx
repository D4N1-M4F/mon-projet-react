import React, { useState, useEffect } from 'react';
import { Card, Steps, Popover, Layout, Button, Image, Typography } from 'antd';
import { ShoppingCartOutlined, SettingOutlined, RocketOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';

const { Header, Content, Footer } = Layout;
const { Text } = Typography;

const SuiviCommandeclient = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      const demoOrders = [
        {
          orderId: '12345',
          date: '2023-10-01',
          status: 'En cours',
          deliveryAddress: '123 Rue de Paris, France',
          paymentMethod: 'Carte de crédit',
          products: [
            { name: 'Produit A', image: '/assets/produit-a.jpg', description: 'Description du Produit A', price: '19,99 €' },
            { name: 'Produit B', image: '/assets/produit-b.jpg', description: 'Description du Produit B', price: '29,99 €' },
          ],
        },
      ];
      const selectedOrder = demoOrders.find(order => order.orderId === orderId);
      setOrder(selectedOrder);
    }, 1000);
  }, [orderId]);

  if (!order) {
    return (
      <Layout style={{ minHeight: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f2f5' }}>
        <Card style={{ textAlign: 'center', padding: 20 }}>
          <Text strong style={{ fontSize: 18 }}>En cours de chargement...</Text>
        </Card>
      </Layout>
    );
  }

  return (
    <Layout style={{ minHeight: '100vh', width: '100vw', backgroundColor: '#f0f2f5', overflowX: 'hidden' }}>
      <Header style={{ position: 'fixed', top: 0, width: '100%', zIndex: 10, textAlign: 'center', fontSize: '20px', backgroundColor: '#001529', color: 'white', height: 64, lineHeight: '64px', padding: '0 24px' }}>
        Suivi de commande
      </Header>
      <Content style={{ flex: 1, padding: '24px', paddingTop: 80, paddingBottom: 80, display: 'flex', justifyContent: 'center', maxWidth: '1200px', margin: '0 auto', marginTop: 64 }}>
        <Card style={{ width: '100%', maxWidth: 800, backgroundColor: 'white', padding: 24, marginTop: 24 }}>
          <Card title="Suivi de votre commande" style={{ marginBottom: 24 }}>
            <Steps current={currentStep} progressDot={(dot, { status, index }) => (
              <Popover content={<span>Étape {index + 1} - {status}</span>}>
                {dot}
              </Popover>
            )} items={[
              { title: "Commande passée", icon: <ShoppingCartOutlined /> },
              { title: "En préparation", icon: <SettingOutlined /> },
              { title: "Expédiée", icon: <RocketOutlined /> },
              { title: "Livrée", icon: <CheckCircleOutlined /> },
            ]} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
              <Button onClick={() => setCurrentStep(prev => Math.max(prev - 1, 0))}>Précédent</Button>
              <Button onClick={() => setCurrentStep(prev => Math.min(prev + 1, 3))} type="primary">Suivant</Button>
            </div>
          </Card>
          <Card title="Détails de la commande">
            {order.products.map((product, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <Image width={100} src={product.image} alt={product.name} />
                <div style={{ marginLeft: 16 }}>
                  <Text strong>Nom du produit :</Text> {product.name}<br />
                  <Text strong>Description :</Text> {product.description}<br />
                  <Text strong>Prix :</Text> {product.price}
                </div>
              </div>
            ))}
            <p><strong>Numéro de commande :</strong> {order.orderId}</p>
            <p><strong>Date de commande :</strong> {order.date}</p>
            <p><strong>Statut actuel :</strong> {order.status}</p>
          </Card>
        </Card>
      </Content>
      <Footer style={{ textAlign: 'center', backgroundColor: '#001529', color: 'white' }}>
        © 2025 Votre entreprise. Tous droits réservés.
      </Footer>
    </Layout>
  );
};

export default SuiviCommandeclient;