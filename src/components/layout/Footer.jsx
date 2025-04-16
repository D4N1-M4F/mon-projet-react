import React from 'react';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';
import { FacebookOutlined, InstagramOutlined, YoutubeOutlined, TikTokOutlined } from '@ant-design/icons';

const { Footer } = Layout;

const CustomFooter = () => {
  return (
    <Footer style={{ backgroundColor: '#f5f5f5', padding: '40px 20px', textAlign: 'left' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Colonne Boutique */}
        <div>
          <h3>Boutique</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><Link to="/meilleures-ventes">Meilleures ventes</Link></li>
            <li><Link to="/montres">Parfum</Link></li>
            <li><Link to="/bijoux">Lotion</Link></li>
            <li><Link to="/cadeau">Gammes</Link></li>
          </ul>
        </div>

        {/* Colonne À propos de nous */}
        <div>
          <h3>À propos de nous</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><Link to="/notre-histoire">Notre histoire</Link></li>
            <li><Link to="/contact">Contactez-nous</Link></li>
            <li><Link to="/blog">Blog</Link></li>
          </ul>
        </div>

        {/* Colonne Soutien */}
        <div>
          <h3>Soutien</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><Link to="/expedition">Politique d'expédition</Link></li>
            <li><Link to="/suivi-commande">Suivi de commande</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/paiement">Modalité de paiement</Link></li>
            <li><Link to="/retours">Retours et échanges</Link></li>
            <li><Link to="/confidentialite">Politique de confidentialité</Link></li>
          </ul>
        </div>

        {/* Icônes Réseaux Sociaux */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FacebookOutlined style={{ fontSize: '24px' }} /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><InstagramOutlined style={{ fontSize: '24px' }} /></a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><YoutubeOutlined style={{ fontSize: '24px' }} /></a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer"><TikTokOutlined style={{ fontSize: '24px' }} /></a>
        </div>
        
      </div>
    </Footer>
  );
};

export default CustomFooter;
