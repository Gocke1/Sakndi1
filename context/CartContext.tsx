'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

const CART_STORAGE_KEY = 'skandioutlet_cart';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type AddProductPayload = Omit<CartItem, 'quantity'> & { quantity?: number };

type CartContextValue = {
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
  addProduct: (product: AddProductPayload) => void;
  removeProduct: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    try {
      const rawCart = window.localStorage.getItem(CART_STORAGE_KEY);
      if (!rawCart) {
        setHasHydrated(true);
        return;
      }

      const parsedCart = JSON.parse(rawCart);
      if (Array.isArray(parsedCart)) {
        const validItems = parsedCart.filter((item): item is CartItem => {
          return (
            typeof item?.id === 'string' &&
            typeof item?.name === 'string' &&
            typeof item?.price === 'number' &&
            typeof item?.quantity === 'number' &&
            item.quantity > 0
          );
        });

        setItems(validItems);
      }
    } catch {
      setItems([]);
    } finally {
      setHasHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [hasHydrated, items]);

  const addProduct = useCallback((product: AddProductPayload) => {
    const quantityToAdd = product.quantity ?? 1;

    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item,
        );
      }

      return [
        ...currentItems,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: quantityToAdd,
        },
      ];
    });
  }, []);

  const removeProduct = useCallback((productId: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId),
    );
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((currentItems) =>
        currentItems.filter((item) => item.id !== productId),
      );
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    );
  }, []);

  const totalAmount = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const value = useMemo<CartContextValue>(
    () => ({ items, totalAmount, totalItems, addProduct, removeProduct, updateQuantity }),
    [items, totalAmount, totalItems, addProduct, removeProduct, updateQuantity],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
}
