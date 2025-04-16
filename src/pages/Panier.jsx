import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Checkbox, InputNumber, Typography, Input, Space } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

const Panier = () => {
    const [items, setItems] = useState([
        { id: 1, name: "Parfum Floral", price: 30, quantity: 1, stock: 5, image: "parfum.jpg" },
        { id: 2, name: "Savon Doux", price: 5, quantity: 1, stock: 10, image: "savon.jpg" },
        { id: 3, name: "Gel Douche Naturel", price: 12, quantity: 1, stock: 8, image: "gel-douche.jpg" }
    ]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    // Calcul du total chaque fois que selectedItems ou items change
    useEffect(() => {
        const newTotal = items
            .filter(item => selectedItems.includes(item.id))
            .reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        setTotal(newTotal);
        console.log("Total recalculé:", newTotal, "Articles sélectionnés:", selectedItems);
    }, [selectedItems, items]);

    // Gérer la sélection des articles
    const handleCheckboxChange = (id) => {
        setSelectedItems(prevSelected => {
            const newSelected = prevSelected.includes(id) 
                ? prevSelected.filter(itemId => itemId !== id) 
                : [...prevSelected, id];
            
            console.log("Articles sélectionnés après changement:", newSelected);
            return newSelected;
        });
    };

    // Gérer la modification de la quantité
    const handleQuantityChange = (id, value) => {
        const item = items.find(item => item.id === id);
        const newValue = value > 0 ? (value <= item.stock ? value : item.stock) : 1;
        
        setItems(prevItems => 
            prevItems.map(item => 
                item.id === id ? { ...item, quantity: newValue } : item
            )
        );
        console.log("Quantité modifiée pour l'article", id, "nouvelle valeur:", newValue);
    };


    // Supprimer un article
    const handleDelete = (id) => {
        setItems(prevItems => prevItems.filter(item => item.id !== id));
        setSelectedItems(prevSelected => prevSelected.filter(itemId => itemId !== id));
        console.log("Article supprimé:", id);
    };

    // Aller à la page de paiement
    const handleCheckout = () => {
        if (selectedItems.length === 0) return;
        
        const selectedItemsData = items.filter(item => selectedItems.includes(item.id));
        console.log("Passage au paiement avec articles:", selectedItemsData);
        
        navigate("/paiement", { 
            state: { 
                items: selectedItemsData,
                total: total
            } 
        });
    };

    // Rechercher un produit
    const handleSearch = (e) => {
        const searchValue = e.target.value.toLowerCase();
        setSearchText(searchValue);
        console.log("Recherche:", searchValue);
    };

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchText)
    );

    return (
        <div style={{ maxWidth: "800px", margin: "0 auto", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
            <Title level={2} style={{ color: "#1890ff", textAlign: "center" }}>Mon Panier</Title>
            <Input.Search
                placeholder="Rechercher un produit..."
                value={searchText}
                onChange={handleSearch}
                style={{ marginBottom: "20px", maxWidth: "400px", margin: "0 auto 20px" }}
            />

            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                {filteredItems.map((item) => (
                    <Card
                        key={item.id}
                        hoverable
                        style={{
                            border: selectedItems.includes(item.id) ? "2px solid #1890ff" : "1px solid #e8e8e8",
                            borderRadius: "8px",
                            backgroundColor: selectedItems.includes(item.id) ? "#e6f7ff" : "#fff"
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                            <Checkbox 
                                checked={selectedItems.includes(item.id)} 
                                onChange={() => handleCheckboxChange(item.id)}
                            >
                                Sélectionner
                            </Checkbox>

                            <img 
                                alt={item.name} 
                                src={item.image} 
                                style={{ 
                                    width: "100px", 
                                    height: "100px", 
                                    borderRadius: "8px", 
                                    objectFit: "cover" 
                                }} 
                            />

                            <div style={{ flex: 1 }}>
                                <Text strong>{item.name}</Text>
                                <br />
                                <Text>Prix: {item.price}$</Text>
                                <br />
                                <Text type="danger">Stock restant: {item.stock}</Text>
                            </div>

                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <InputNumber
                                    min={1}
                                    max={item.stock}
                                    value={item.quantity}
                                    onChange={(value) => handleQuantityChange(item.id, value)}
                                    style={{ width: "80px" }}
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

            <div style={{ 
                marginTop: "20px", 
                textAlign: "right", 
                padding: "16px", 
                backgroundColor: "#fff", 
                borderRadius: "8px", 
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" 
            }}>
                <Text strong style={{ fontSize: "18px" }}>
                    Total: {total.toFixed(2)}$
                </Text>
                <Button
                    type="primary"
                    onClick={handleCheckout}
                    disabled={selectedItems.length === 0}
                    style={{ marginLeft: "20px" }}
                >
                    {selectedItems.length === 0 ? "Veuillez sélectionner des articles" : "Paiement"}
                </Button>
            </div>
        </div>
    );
};

export default Panier;