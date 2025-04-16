// src/pages/listecommandeclient.jsx
import React, { useState, useEffect } from 'react';
import { Table, Tag, Image, Button, Input, notification } from 'antd';
import { json2csv } from 'json-2-csv';
import './styles.css'; // Importez les styles CSS

const ListeCommandeClient = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  // Données de démonstration pour les commandes
  useEffect(() => {
    setTimeout(() => {
      const demoOrders = [
        {
          key: '1',
          orderId: '12345',
          date: '2023-10-01',
          status: 'En cours',
          deliveryAddress: '123 Rue de Paris, France',
          paymentMethod: 'Carte de crédit',
          products: [
            { name: 'Produit A', image: 'url_de_l_image_A', description: 'Description du Produit A', price: '19,99 €' },
            { name: 'Produit B', image: 'url_de_l_image_B', description: 'Description du Produit B', price: '29,99 €' }
          ],
        },
        {
          key: '2',
          orderId: '12346',
          date: '2023-10-02',
          status: 'Livré',
          deliveryAddress: '456 Avenue de Lyon, France',
          paymentMethod: 'PayPal',
          products: [
            { name: 'Produit C', image: 'url_de_l_image_C', description: 'Description du Produit C', price: '39,99 €' }
          ],
        },
        {
          key: '3',
          orderId: '12347',
          date: '2023-10-03',
          status: 'Annulé',
          deliveryAddress: '789 Boulevard de Marseille, France',
          paymentMethod: 'Carte de crédit',
          products: [
            { name: 'Produit D', image: 'url_de_l_image_D', description: 'Description du Produit D', price: '49,99 €' },
            { name: 'Produit E', image: 'url_de_l_image_E', description: 'Description du Produit E', price: '59,99 €' }
          ],
        },
      ];
      setOrders(demoOrders);
      setLoading(false);

      // Notification pour les nouvelles commandes livrées
      const newDeliveredOrders = demoOrders.filter(order => order.status === 'Livré');
      if (newDeliveredOrders.length > 0) {
        notification.success({
          message: 'Nouvelles commandes livrées',
          description: `${newDeliveredOrders.length} commande(s) ont été livrées.`,
        });
      }
    }, 1000);
  }, []);

  // Filtrer les commandes en fonction du statut et de la recherche
  const filteredOrders = orders
    .filter(order => filter === 'all' || order.status === filter)
    .filter(order =>
      order.orderId.includes(searchTerm) ||
      order.products.some(product => product.name.includes(searchTerm))
    );

  // Statistiques des commandes
  const totalOrders = orders.length;
  const deliveredOrders = orders.filter(order => order.status === 'Livré').length;
  const pendingOrders = orders.filter(order => order.status === 'En cours').length;
  const canceledOrders = orders.filter(order => order.status === 'Annulé').length;

  // Exporter les données en CSV
  const handleExport = () => {
    json2csv(orders, (err, csv) => {
      if (err) {
        notification.error({
          message: 'Erreur lors de l\'export',
          description: 'Une erreur s\'est produite lors de l\'export des données.',
        });
        return;
      }
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'commandes.csv';
      link.click();
      notification.success({
        message: 'Export réussi',
        description: 'Les données ont été exportées avec succès.',
      });
    });
  };

  // Configuration des colonnes pour le tableau
  const columns = [
    {
      title: 'ID Commande',
      dataIndex: 'orderId',
      key: 'orderId',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Statut',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = '';
        switch (status) {
          case 'En cours':
            color = 'blue';
            break;
          case 'Livré':
            color = 'green';
            break;
          case 'Annulé':
            color = 'red';
            break;
          default:
            color = 'gray';
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Produits',
      dataIndex: 'products',
      key: 'products',
      render: (products) => (
        <div>
          {products.map((product, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <Image src={product.image} width={50} />
              <div>{product.name}</div>
              <div>{product.description}</div>
              <div>{product.price}</div>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px', width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: '#1890ff', textAlign: 'center' }}>Suivi des Commandes</h1>

      {/* Résumé des commandes */}
      <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
        <h2>Résumé des commandes</h2>
        <p>Total des commandes : <Tag color="default">{totalOrders}</Tag></p>
        <p>Commandes en cours : <Tag color="blue">{pendingOrders}</Tag></p>
        <p>Commandes livrées : <Tag color="green">{deliveredOrders}</Tag></p>
        <p>Commandes annulées : <Tag color="red">{canceledOrders}</Tag></p>
      </div>

      {/* Boutons de filtrage */}
      <div style={{ marginBottom: '20px' }}>
        <Button onClick={() => setFilter('all')} style={{ marginRight: '10px', backgroundColor: '#f0f0f0' }}>Toutes les commandes</Button>
        <Button onClick={() => setFilter('En cours')} style={{ marginRight: '10px', backgroundColor: '#1890ff', color: '#fff' }}>Commandes en cours</Button>
        <Button onClick={() => setFilter('Livré')} style={{ marginRight: '10px', backgroundColor: '#52c41a', color: '#fff' }}>Commandes livrées</Button>
        <Button onClick={() => setFilter('Annulé')} style={{ backgroundColor: '#ff4d4f', color: '#fff' }}>Commandes annulées</Button>
      </div>

      {/* Barre de recherche */}
      <Input
        placeholder="Rechercher une commande..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '20px', width: '300px', borderColor: '#1890ff', backgroundColor: '#f0f0f0' }}
      />

      {/* Bouton d'export */}
      <Button onClick={handleExport} style={{ marginBottom: '20px', backgroundColor: '#52c41a', color: '#fff', borderColor: '#52c41a' }}>
        Exporter en CSV
      </Button>

      {/* Tableau des commandes */}
      <Table
        dataSource={filteredOrders}
        columns={columns}
        loading={loading}
        pagination={{ pageSize: 5 }}
        rowClassName={(record) => {
          switch (record.status) {
            case 'En cours':
              return 'row-blue';
            case 'Livré':
              return 'row-green';
            case 'Annulé':
              return 'row-red';
            default:
              return '';
          }
        }}
      />
    </div>
  );
};

export default ListeCommandeClient;