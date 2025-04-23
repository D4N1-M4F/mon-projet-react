import React, { useEffect, useState } from 'react';
import {
  Menu, Input, Avatar, Dropdown, Typography,
  Badge, Button, Space, message, Drawer, Layout
} from 'antd';
import {
  MenuOutlined, ShoppingCartOutlined, SearchOutlined,
  UserOutlined, LoginOutlined, UserAddOutlined,
  LogoutOutlined, DashboardOutlined, BellOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const { Header } = Layout;
const { Title } = Typography;
const { Search } = Input;

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [currentPath, setCurrentPath] = useState('/');
  const { cartItems } = useCart();
  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = JSON.parse(localStorage.getItem('user'));
    setIsLoggedIn(!!token);
    setUser(userData);
    setCurrentPath(location.pathname);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    message.success('Déconnexion réussie');
    navigate('/');
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        <Link to="/profile">Mon profil</Link>
      </Menu.Item>
      <Menu.Item key="orders" icon={<ShoppingCartOutlined />}>
        <Link to="/suivi-commande/:orderId">Mes commandes ({cartItemsCount})</Link>
      </Menu.Item>
      <Menu.Item key="notifications" icon={<BellOutlined />}>
        <Link to="/notifications">Notifications</Link>
      </Menu.Item>
      {user?.role === 'admin' && (
        <Menu.Item key="admin" icon={<DashboardOutlined />}>
          <Link to="/admin">Tableau de bord</Link>
        </Menu.Item>
      )}
      <Menu.Divider />
      <Menu.Item key="help" icon={<QuestionCircleOutlined />}>
        <Link to="/help">Aide</Link>
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} danger onClick={handleLogout}>
        Déconnexion
      </Menu.Item>
    </Menu>
  );

  const mainMenuItems = [
    { key: 'home', label: <Link to="/">Accueil</Link> },
    { key: 'products', label: <Link to="/Produits">Produits</Link> },
    { key: 'contact', label: <Link to="/contact">Contact</Link> },
    { key: 'about', label: <Link to="/about">À propos</Link> },
  ];

  return (
    <Header style={{
      position: 'fixed',
      top: 0,
      zIndex: 1000,
      width: '100%',
      padding: '0 24px',
      background: '#fff',
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            src="/logo.png"
            size="large"
            style={{
              backgroundColor: '#1890ff',
              color: '#fff',
              fontWeight: 'bold',
              marginRight: 12
            }}
          >
            SN
          </Avatar>
          <Title level={4} style={{
            margin: 0,
            color: '#1890ff',
            fontWeight: 600,
            display: { xs: 'none', md: 'block' }
          }}>
            SN Beauty
          </Title>
        </Link>
      </div>

      {/* Menu principal */}
      <Menu
        theme="light"
        mode="horizontal"
        selectedKeys={[currentPath.split('/')[1] || 'home']}
        items={mainMenuItems}
        style={{
          flex: 1,
          minWidth: 0,
          justifyContent: 'center',
          borderBottom: 'none',
          display: { xs: 'none', md: 'flex' }
        }}
      />

      {/* Actions utilisateur */}
      <Space size="middle" style={{ marginLeft: 'auto' }}>
        <Search
          placeholder="Rechercher..."
          allowClear
          enterButton={<SearchOutlined />}
          style={{ width: 200 }}
          onSearch={value => setSearchQuery(value)}
        />

        <Badge count={cartItemsCount} size="small">
          <Button
            type="text"
            icon={<ShoppingCartOutlined style={{ fontSize: 20 }} />}
            onClick={() => navigate('/Panier')}
          />
        </Badge>

        {isLoggedIn ? (
          <Dropdown overlay={userMenu} placement="bottomRight" arrow>
            <Button type="text" style={{ padding: '0 8px' }}>
              <Space>
                <Avatar
                  size="small"
                  src={user?.avatar}
                  icon={<UserOutlined />}
                />
                <span style={{ display: { xs: 'none', md: 'inline' } }}>
                  {user?.name || 'Mon compte'}
                </span>
              </Space>
            </Button>
          </Dropdown>
        ) : (
          <Space.Compact>
            <Button
              type="text"
              icon={<LoginOutlined />}
              onClick={() => navigate('/login')}
            >
              Connexion
            </Button>
            <Button
              type="primary"
              icon={<UserAddOutlined />}
              onClick={() => navigate('/register')}
            >
              Inscription
            </Button>
          </Space.Compact>
        )}
      </Space>

      {/* Menu mobile */}
      <Drawer
        title="Menu"
        placement="left"
        closable={true}
        onClose={() => setMobileMenuVisible(false)}
        visible={mobileMenuVisible}
        bodyStyle={{ padding: 0 }}
      >
        <Menu
          mode="inline"
          selectedKeys={[currentPath.split('/')[1] || 'home']}
          items={mainMenuItems.map(item => ({
            ...item,
            label: <Link to={`/${item.key}`}>{item.label}</Link>
          }))}
          style={{ borderRight: 0 }}
        />
      </Drawer>
    </Header>
  );
};

export default Navbar;
