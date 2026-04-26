import { createContext, useContext, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addToCart = (product, variant, qty = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.variantId === variant.id);
      if (existing) {
        return prev.map(i => i.variantId === variant.id ? { ...i, qty: i.qty + qty } : i);
      }
      return [...prev, { productId: product.id, variantId: variant.id, name: product.name, variant: variant.label, price: variant.price, thumbnail: product.thumbnail, qty }];
    });
  };

  const removeFromCart = (variantId) => setItems(prev => prev.filter(i => i.variantId !== variantId));

  const updateQty = (variantId, qty) => {
    if (qty < 1) return removeFromCart(variantId);
    setItems(prev => prev.map(i => i.variantId === variantId ? { ...i, qty } : i));
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQty, clearCart, totalItems, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
