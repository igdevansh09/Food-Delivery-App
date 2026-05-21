import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type OrderType = {
  id: string;
  restaurant: string;
  items: string;
  date: string;
  status: "Preparing" | "Delivered" | "Cancelled";
  price: string;
};

type CartContextType = {
  orders: OrderType[];
  addOrder: (data: Omit<OrderType, "id" | "date" | "status">) => void;
  cancelOrder: (id: string) => void;
  cartCount: number;
  isCartLoaded: boolean;
};

const CartContext = createContext<CartContextType>({} as CartContextType);

const STORAGE_KEY = "@foodapp_orders";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [isCartLoaded, setIsCartLoaded] = useState(false);

  const cartCount = orders.filter((o) => o.status === "Preparing").length;

  useEffect(() => {
    async function loadOrders() {
      try {
        const storedOrders = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedOrders) {
          setOrders(JSON.parse(storedOrders));
        }
      } catch (error) {
        console.error("CartContext Failed to load orders from disk:", error);
      } finally {
        setIsCartLoaded(true);
      }
    }
    loadOrders();
  }, []);

  useEffect(() => {
    if (!isCartLoaded) return;

    async function saveOrders() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
      } catch (error) {
        console.error("CartContext Failed to save orders to disk:", error);
      }
    }
    saveOrders();
  }, [orders, isCartLoaded]);

  function addOrder(data: Omit<OrderType, "id" | "date" | "status">) {
    const date = new Date();
    const formatted = `${date.getDate()} ${date.toLocaleString("default", {
      month: "short",
    })}, ${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    setOrders((prev) => [
      {
        id: Math.random().toString(),
        date: formatted,
        status: "Preparing",
        ...data,
      },
      ...prev,
    ]);
  }

  function cancelOrder(id: string) {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: "Cancelled" } : o)),
    );
  }

  return (
    <CartContext.Provider
      value={{ orders, addOrder, cancelOrder, cartCount, isCartLoaded }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
