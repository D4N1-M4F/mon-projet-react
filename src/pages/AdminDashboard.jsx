
import React, { useState, useEffect } from 'react';
import {
  Layout, Menu, Table, Button, Input, Space,
  Modal, message, Form
} from 'antd';
import {
  AppstoreOutlined, ShoppingCartOutlined, UserOutlined,
  InboxOutlined, HomeOutlined, AuditOutlined
} from '@ant-design/icons';
import axios from 'axios';
import InputField from '../components/forms/InputField';
import SelectField from '../components/forms/SelectField';
import SubmitButton from '../components/forms/SubmitButton';

const { Sider, Content } = Layout;
const API_BASE = 'http://localhost:5000';

const CATEGORIES = [
  { label: 'Lotions', value: 'Lotions' },
  { label: 'Gels Douches', value: 'Gels Douches' },
  { label: 'Huiles', value: 'Huiles' },
  { label: 'Sérums', value: 'Sérums' },
  { label: 'Gammes', value: 'Gammes' }
];

const AdminDashboard = () => {
  const [form] = Form.useForm();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [products, setProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_BASE}/api/produits`);
      setProducts(data);
    } catch (error) {
      console.error(error);
      message.error('Erreur lors du chargement des produits.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (ids) => {
    try {
      await Promise.all(ids.map(id =>
        axios.delete(`${API_BASE}/api/produits/${id}`)
      ));
      message.success('Produit(s) supprimé(s) avec succès !');
      setSelectedRowKeys([]);
      fetchProducts();
    } catch (error) {
      console.error(error);
      message.error('Erreur lors de la suppression.');
    }
  };

  const handleAdd = () => {
    setEditingProduct(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingProduct(record);
    form.setFieldsValue({
      ...record,
      prix: parseFloat(record.prix),
      stock: parseInt(record.stock, 10)
    });
    setIsModalVisible(true);
  };

  const onFinish = async (values) => {
    try {
      setConfirmLoading(true);
      let imageFilename = editingProduct?.image || null;

      if (selectedImage) {
        const formData = new FormData();
        formData.append('image', selectedImage);
        const { data } = await axios.post(`${API_BASE}/api/upload`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        imageFilename = data.filename;
      }

      const payload = { ...values, image: imageFilename };

      if (editingProduct) {
        await axios.put(`${API_BASE}/api/produits/${editingProduct.id_Produit}`, payload);
        message.success('Produit modifié avec succès !');
      } else {
        await axios.post(`${API_BASE}/api/produits`, payload);
        message.success('Produit ajouté avec succès !');
      }

      setIsModalVisible(false);
      form.resetFields();
      setSelectedImage(null);
      fetchProducts();
    } catch (error) {
      console.error(error);
      message.error("Erreur lors de l'enregistrement.");
    } finally {
      setConfirmLoading(false);
    }
  };

  const columns = [
    { title: 'ID', dataIndex: 'id_Produit' },
    { title: 'Nom', dataIndex: 'nom' },
    { title: 'Description', dataIndex: 'descriptions' },
    {
      title: 'Prix ($CAD)',
      dataIndex: 'prix',
      render: (prix) => `${parseFloat(prix).toFixed(2)} $CAD`
    },
    { title: 'Stock', dataIndex: 'stock' },
    { title: 'Catégorie', dataIndex: 'categorie' },
    {
      title: 'Image',
      dataIndex: 'image',
      render: (img) => img ? (
        <img src={`${API_BASE}/uploads/${img}`} alt="Produit" style={{ width: 60, height: 60, objectFit: 'cover' }} />
      ) : '-'
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button size="small" onClick={() => handleEdit(record)}>Modifier</Button>
          <Button size="small" danger onClick={() => handleDelete([record.id_Produit])}>Supprimer</Button>
        </Space>
      )
    }
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={250} style={{ background: '#fff' }}>
        <Menu mode="inline" defaultSelectedKeys={['products']} style={{ height: '100%' }}>
          <Menu.Item key="home" icon={<HomeOutlined />}>Accueil</Menu.Item>
          <Menu.Item key="orders" icon={<ShoppingCartOutlined />}>Commandes</Menu.Item>
          <Menu.Item key="products" icon={<AppstoreOutlined />}>Produits</Menu.Item>
          <Menu.Item key="clients" icon={<UserOutlined />}>Clients</Menu.Item>
          <Menu.Item key="categories" icon={<InboxOutlined />}>Catégories</Menu.Item>
          <Menu.Item key="audit" icon={<AuditOutlined />}>Audit</Menu.Item>
        </Menu>
      </Sider>

      <Layout style={{ padding: '24px' }}>
        <Content>
          <h1>Gestion des Produits</h1>
          <Space style={{ marginBottom: 16 }}>
            <Button type="primary" onClick={handleAdd}>AJOUTER</Button>
            <Button danger disabled={!selectedRowKeys.length} onClick={() => handleDelete(selectedRowKeys)}>SUPPRIMER</Button>
            <Input.Search placeholder="Rechercher..." onChange={e => setSearchTerm(e.target.value)} style={{ width: 200 }} />
            <Button onClick={fetchProducts}>ACTUALISER</Button>
          </Space>

          <Table
            rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }}
            columns={columns}
            dataSource={products.filter(p =>
              p.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
              p.categorie.toLowerCase().includes(searchTerm.toLowerCase())
            )}
            rowKey="id_Produit"
            loading={loading}
            pagination={{ pageSize: 5 }}
          />

          <Modal
            title={editingProduct ? 'Modifier un produit' : 'Ajouter un produit'}
            open={isModalVisible}
            onCancel={() => {
              setIsModalVisible(false);
              form.resetFields();
              setEditingProduct(null);
              setSelectedImage(null);
            }}
            footer={null}
            destroyOnClose
          >
            <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={() => message.error('Veuillez remplir tous les champs obligatoires')}>
              <InputField name="nom" label="Nom du produit" rules={[{ required: true, message: 'Ce champ est obligatoire' }]} />
              <InputField name="descriptions" label="Description" type="textarea" rules={[{ required: true, message: 'Ce champ est obligatoire' }]} />
              <InputField name="prix" label="Prix (€)" type="number" min={0} step={0.01} rules={[{ required: true }, { type: 'number', min: 0 }]} />
              <InputField name="stock" label="Stock" type="number" min={0} rules={[{ required: true }, { type: 'integer', min: 0 }]} />
              <SelectField name="categorie" label="Catégorie" options={CATEGORIES} rules={[{ required: true }]} />
              <Form.Item label="Image">
                <Input type="file" accept="image/*" onChange={(e) => setSelectedImage(e.target.files[0])} />
              </Form.Item>
              <Form.Item style={{ marginTop: 24, textAlign: 'right' }}>
                <Space>
                  <Button onClick={() => setIsModalVisible(false)}>Annuler</Button>
                  <SubmitButton loading={confirmLoading} label={editingProduct ? 'Modifier' : 'Ajouter'} />
                </Space>
              </Form.Item>
            </Form>
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
