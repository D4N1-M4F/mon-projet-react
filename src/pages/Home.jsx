import React from 'react';
import { Layout, Carousel, Typography, Divider } from 'antd';
const { Content } = Layout;
const { Title } = Typography;

import TrendingProducts from '../components/sections/TrendingProducts';
import NewArrivals from '../components/sections/NewArrivals';
import Categories from '../components/sections/Categories';
import ProductByGamme from '../components/sections/ProductByGamme';
import CustomFooter from '../components/layout/Footer';

// Importation des images
import img1 from '../assets/gamme vaseline.png';
import img2 from '../assets/gamme healthy glow2.png';
import img3 from '../assets/gamme healthy glow.png';
import lotionsImg from '../assets/Lotions.png'; 
import gelsDouchesImg from '../assets/gel douche vaseline.png';
import huilesImg from '../assets/huile veetGold.png';
import serumsImg from '../assets/sérum vaseline.png';
import gammesImg from '../assets/gamme vaseline.png';
import produit1 from '../assets/sérum vaseline.png';
import produit2 from '../assets/VeetGold gel gommant.png';
import produit3 from '../assets/Vaseline gel gommant.jpeg';

const Home = () => {
  const trendingProducts = [
    { 
      id: 1, 
      name: "Sérum Vaseline", 
      price: 29.99, 
      originalPrice: 39.99,
      discount: 25,
      rating: 4.5,
      stock: 15,
      image: produit1 
    },
    { 
      id: 2, 
      name: "Gel Gommant Veet Gold", 
      price: 39.99, 
      rating: 4.2,
      stock: 3,
      image: produit2 
    },
    { 
      id: 3, 
      name: "Gel Hydratant Vaseline", 
      price: 49.99, 
      rating: 4.7,
      stock: 0,
      image: produit3 
    },
  ];

  // Mise à jour des catégories pour correspondre à votre liste
  const categories = [
    { id: "lotions", name: "Lotions", image: lotionsImg },
    { id: "gels-douches", name: "Gels Douches", image: gelsDouchesImg },
    { id: "huiles", name: "Huiles", image: huilesImg },
    { id: "serums", name: "Sérums", image: serumsImg },
    { id: "gammes", name: "Gammes", image: gammesImg },
  ];
  
  const carouselItems = [
    { id: 1, image: img1, title: "Nouvelle Gamme Vaseline", subtitle: "Découvrez notre collection exclusive" },
    { id: 2, image: img2, title: "Healthy Glow", subtitle: "Pour un teint éclatant" },
    { id: 3, image: img3, title: "Offre Spéciale", subtitle: "Jusqu'à -30% sur les best-sellers" }
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <Content style={{ 
        width: '100%',
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        {/* Carrousel */}
        <div style={{ marginBottom: 40 }}>
        <Carousel 
          autoplay 
          style={{ 
            height: '400px',
            borderRadius: '8px',
            overflow: 'hidden'
          }}
        >
          {carouselItems.map(item => (
            <div key={item.id}>
              <img 
                src={item.image} 
                style={{ 
                  width: '100%',
                  height: '400px', 
                  objectFit: 'cover', 
                  objectPosition: 'center' 
                }} 
                alt={item.title}
              />
            </div>
          ))}
        </Carousel>
        </div>

        {/* Sections avec titres et séparateurs */}
        <section style={{ marginBottom: 60 }}>
          <Divider orientation="left">
            <Title level={3} style={{ color: '#1890ff' }}>Produits Tendances</Title>
          </Divider>
          <TrendingProducts products={trendingProducts} />
        </section>

        <section style={{ marginBottom: 60 }}>
          <Divider orientation="left">
            <Title level={3} style={{ color: '#1890ff' }}>Nouveautés</Title>
          </Divider>
          <NewArrivals products={[...trendingProducts].reverse()} />
        </section>

        <section style={{ marginBottom: 60 }}>
          <Divider orientation="left">
            <Title level={3} style={{ color: '#1890ff' }}>Nos Catégories</Title>
          </Divider>
          <Categories categories={categories} />
        </section>

        <section style={{ marginBottom: 60 }}>
          <Divider orientation="left">
            <Title level={3} style={{ color: '#1890ff' }}>Par Gamme</Title>
          </Divider>
          <ProductByGamme gammes={trendingProducts} />
        </section>
      </Content>
    </Layout>
  );
};

export default Home;