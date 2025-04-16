import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values) => {
    setLoading(true);
    
    setTimeout(() => {
      if (values.username === 'admin' && values.password === 'admin123') {
        const userData = {
          name: 'Administrateur',
          role: 'admin',
          avatar: '/assets/admin-avatar.png'
        };
        localStorage.setItem('token', 'fake-jwt-token-admin');
        localStorage.setItem('user', JSON.stringify(userData));
        window.dispatchEvent(new Event('storage'));
        navigate('/admin');
        message.success('Connexion réussie (Admin)');
      } 
      else if (values.username === 'client' && values.password === 'client123') {
        const userData = {
          name: 'Client',
          role: 'client',
          avatar: '/assets/client-avatar.png'
        };
        localStorage.setItem('token', 'fake-jwt-token-client');
        localStorage.setItem('user', JSON.stringify(userData));
        window.dispatchEvent(new Event('storage'));
        navigate('/');
        message.success('Connexion réussie (Client)');
      } 
      else {
        message.error('Identifiants incorrects');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <Card title="Connexion" style={{ width: 400 }}>
        <Form onFinish={onFinish}>
          <Form.Item name="username" rules={[{ required: true }]}>
            <Input prefix={<UserOutlined />} placeholder="Nom d'utilisateur" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="Mot de passe" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Se connecter
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;