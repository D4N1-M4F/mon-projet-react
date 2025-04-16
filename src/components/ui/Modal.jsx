import React from 'react';
import { Modal as AntModal } from 'antd';

const Modal = ({ visible, onClose, title, children }) => {
  return (
    <AntModal title={title} open={visible} onCancel={onClose} footer={null}>
      {children}
    </AntModal>
  );
};

export default Modal;
