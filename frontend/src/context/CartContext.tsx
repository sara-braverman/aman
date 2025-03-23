import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { fetchData } from "../services/api";

interface CartItem {
  productId: string;
  quantity: number;
}

interface Cart {
  cartId: string;
  customerId: string;
  items: CartItem[];
}

interface Customer {
  customerId: string;
  name: string;
}

interface CartContextType {
  carts: Cart[];
  customers: Customer[];
  addProductToCart: (cartId: string, customerId: string, productId: string, quantity: number) => void;
  updateCartQuantity: (cartId: string, productId: string, newQuantity: number) => void;
  getTopSellingProducts: () => Promise<any[]>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    fetchData("carts").then(setCarts);
    fetchData("customers").then(setCustomers); // Fetch customer data
  }, []);

  const addProductToCart = async (cartId: string, customerId: string, productId: string, quantity: number) => {
    await fetchData(`carts/${cartId}/items`, "POST", { customerId, productId, quantity });
    setCarts(
      carts.map((cart) =>
        cart.cartId === cartId
          ? {
              ...cart,
              items: [...cart.items, { productId, quantity }], 
            }
          : cart
      )
    );
  };

  const updateCartQuantity = async (cartId: string, productId: string, newQuantity: number) => {
    await fetchData(`carts/${cartId}/items/${productId}`, "PUT", { newQuantity });
    setCarts(
      carts.map((cart) =>
        cart.cartId === cartId
          ? {
              ...cart,
              items: cart.items.map((item) =>
                item.productId === productId ? { ...item, quantity: newQuantity } : item
              ),
            }
          : cart
      )
    );
  };

  const getTopSellingProducts = async () => {
    return await fetchData("carts/top-selling");
  };

  return (
    <CartContext.Provider value={{ carts, customers, addProductToCart, updateCartQuantity, getTopSellingProducts }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCartContext must be used within a CartProvider");
  return context;
};
