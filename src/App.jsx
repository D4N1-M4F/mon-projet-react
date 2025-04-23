import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import { CartProvider } from './components/contexts/CartContext';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import CustomFooter from './components/layout/Footer';
import SuiviCommandeclient from './pages/SuiviCommandeclient';
import ListeCommandeClient from './pages/listecommandeclient';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Produits from './pages/Produits';
import ProduitInfo from './pages/ProduitInfo';
import Panier from './pages/Panier';
import Paiement from './pages/Paiement';




const { Header, Content, Footer } = Layout;

function App() {
  return (
    <CartProvider>
    <Router>
      

        {/* HEADER avec Navbar */}
        <Header
          style={{
            backgroundColor: '#fff',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            height: '64px',
            padding: 0,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
          }}
        >
          <Navbar />
        </Header>

        {/* CONTENU avec offset vers le bas */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/suivi-commande/:orderId" element={<SuiviCommandeclient />} />
            <Route path="/listecommandeclient" element={<ListeCommandeClient />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Produits" element={<Produits />} />
            <Route path="/produit/:id" element={<ProduitInfo />} />
            <Route path="/Panier" element={<Panier />} />
            <Route path="/Paiement" element={<Paiement />} />


          </Routes>
        

        {/* FOOTER */}
        <Footer style={{ padding: 0 }}>
          <CustomFooter />
        </Footer>
        
      
    </Router>
    </CartProvider>
  );
}

export default App;
