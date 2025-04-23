import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { message } from 'antd';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Chargement initial depuis localStorage
  const [cartItems, setCartItems] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  // Sauvegarde automatique dans localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Ajout au panier avec gestion des stocks
  const addToCart = useCallback((product, quantity = 1) => {
    // Vérification initiale du stock
    if (product.stock !== undefined && quantity > product.stock) {
      message.error(`Stock insuffisant! Seulement ${product.stock} unité(s) disponible(s)`);
      return; // Sortie précoce si stock insuffisant
    }
  
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      
      if (existingItem) {
        // Vérification du stock cumulé
        const newQuantity = existingItem.quantity + quantity;
        if (product.stock !== undefined && newQuantity > product.stock) {
          message.warning(`Quantité maximale atteinte (${product.stock} unités)`);
          return prev; // Retourne l'ancien panier sans modification
        }
        
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: newQuantity }
            : item
        );
      }
      
      // Ajout d'un nouveau produit
      return [...prev, { 
        ...product, 
        quantity,
        addedAt: new Date().toISOString()
      }];
    });
    
    message.success(`${quantity} ${product.name} ajouté${quantity > 1 ? 's' : ''} au panier`);
  }, []);

  // Retrait du panier
  const removeFromCart = useCallback((productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
    message.info('Produit retiré du panier');
  }, []);

  // Mise à jour de la quantité
  const updateQuantity = useCallback((productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCartItems(prev =>
      prev.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  }, [removeFromCart]);

  // Vidage du panier
  const clearCart = useCallback(() => {
    setCartItems([]);
    message.info('Panier vidé');
  }, []);

  // Calcul des totaux
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemsCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  // Valeur du contexte
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    itemsCount,
    // Tri par date d'ajout
    sortedItems: [...cartItems].sort((a, b) => 
      new Date(b.addedAt) - new Date(a.addedAt)
    )
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart doit être utilisé dans un CartProvider');
  }
  return context;
};