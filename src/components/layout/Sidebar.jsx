import React from 'react';
import { Menu } from 'antd';

const Sidebar = () => {
  return (
    <Menu mode="vertical">
      <Menu.Item key="dashboard">Tableau de bord</Menu.Item>
      <Menu.Item key="settings">Paramètres</Menu.Item>
    </Menu>
  );
};

export default Sidebar;
