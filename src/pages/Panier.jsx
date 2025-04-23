import React, { useState, useEffect } from "react";
import { useCart } from '../components/contexts/CartContext';
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Checkbox,
  InputNumber,
  Typography,
  Input,
  Space,
  Image,
  Empty,
  message,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;
const API_BASE = "http://localhost:5000";

const Panier = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredItems, setFilteredItems] = useState(cartItems);
  const navigate = useNavigate();

  useEffect(() => {
    const result = cartItems.filter((item) =>
      item.name.toLowerCase().includes(searchText)
    );
    setFilteredItems(result);
  }, [searchText, cartItems]);

  const handleCheckboxChange = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleQuantityChange = (id, value) => {
    updateQuantity(id, value);
  };

  const handleDelete = (id) => {
    removeFromCart(id);
    setSelectedItems((prev) => prev.filter((i) => i !== id));
  };

  const total = cartItems
    .filter((item) => selectedItems.includes(item.id))
    .reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      message.warning("Veuillez sélectionner des articles.");
      return;
    }

    const selected = cartItems.filter((item) =>
      selectedItems.includes(item.id)
    );

    navigate("/paiement", {
      state: {
        items: selected,
        total: total.toFixed(2),
      },
    });
  };

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "24px",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <Title level={2} style={{ color: "#1890ff", textAlign: "center" }}>
        Mon Panier
      </Title>

      <Input.Search
        placeholder="Rechercher un produit..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value.toLowerCase())}
        style={{ marginBottom: 20 }}
      />

      {filteredItems.length === 0 ? (
        <Empty description="Votre panier est vide." />
      ) : (
        <Space direction="vertical" style={{ width: "100%" }}>
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              hoverable
              style={{
                border: selectedItems.includes(item.id)
                  ? "2px solid #1890ff"
                  : "1px solid #e8e8e8",
                backgroundColor: selectedItems.includes(item.id)
                  ? "#e6f7ff"
                  : "#fff",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  flexWrap: "wrap",
                }}
              >
                <Checkbox
                  checked={selectedItems.includes(item.id)}
                  onChange={() => handleCheckboxChange(item.id)}
                >
                  Sélectionner
                </Checkbox>

                <Image
                  src={`${API_BASE}/uploads/${item.image}`}
                  alt={item.name}
                  width={100}
                  height={100}
                  style={{ borderRadius: 8, objectFit: "cover" }}
                />

                <div style={{ flex: 1 }}>
                  <Text strong>{item.name}</Text>
                  <br />
                  <Text>Prix : {parseFloat(item.price).toFixed(2)} $CAD</Text>
                  <br />
                  <Text type="danger">Stock restant : {item.stock}</Text>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <InputNumber
                    min={1}
                    max={item.stock}
                    value={item.quantity}
                    onChange={(val) => handleQuantityChange(item.id, val)}
                  />
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(item.id)}
                  />
                </div>
              </div>
            </Card>
          ))}
        </Space>
      )}

      {selectedItems.length > 0 && (
        <div
          style={{
            marginTop: 30,
            textAlign: "right",
            padding: "16px",
            backgroundColor: "#fff",
            borderRadius: "8px",
          }}
        >
          <Text strong style={{ fontSize: "18px" }}>
            Total : {total.toFixed(2)} $CAD
          </Text>
          <Button
            type="primary"
            onClick={handleCheckout}
            style={{ marginLeft: 20 }}
          >
            Paiement
          </Button>
        </div>
      )}
    </div>
  );
};

export default Panier;
