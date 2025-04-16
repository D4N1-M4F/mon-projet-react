import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Sider, Content } = Layout;

const AdminDashboard = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1"><Link to="/admin/products">Produits</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/admin/categories">Catégories</Link></Menu.Item>
          <Menu.Item key="3"><Link to="/admin/clients">Clients</Link></Menu.Item>
          <Menu.Item key="4"><Link to="/admin/orders">Commandes</Link></Menu.Item>
          <Menu.Item key="5"><Link to="/admin/users">Utilisateurs</Link></Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ padding: '24px' }}>
          <h1>Bienvenue dans l'espace administrateur</h1>
          {/* Tu peux ici mettre un résumé ou une redirection */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
