import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { CartState, CartAction } from '../types/cart';
import { Product } from '../types/product';

const CART_STORAGE_KEY = 'cart_items';

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, size } = action.payload;
      const existing = state.items.find(
        item => item.product.id === product.id && item.selectedSize === size
      );
      if (existing) {
        return {
          ...state,
          items: state.items.map(item =>
            item.product.id === product.id && item.selectedSize === size
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { product, quantity: 1, selectedSize: size }],
      };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(
          item => !(item.product.id === action.payload.productId && item.selectedSize === action.payload.size)
        ),
      };
    case 'UPDATE_QUANTITY': {
      const { productId, size, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            item => !(item.product.id === productId && item.selectedSize === size)
          ),
        };
      }
      return {
        ...state,
        items: state.items.map(item =>
          item.product.id === productId && item.selectedSize === size
            ? { ...item, quantity }
            : item
        ),
      };
    }
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
}

interface CartContextType {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  addItem: (product: Product, size: number) => void;
  removeItem: (productId: string, size: number) => void;
  updateQuantity: (productId: string, size: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] }, (initial) => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? (JSON.parse(stored) as CartState) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const addItem = (product: Product, size: number) =>
    dispatch({ type: 'ADD_ITEM', payload: { product, size } });

  const removeItem = (productId: string, size: number) =>
    dispatch({ type: 'REMOVE_ITEM', payload: { productId, size } });

  const updateQuantity = (productId: string, size: number, quantity: number) =>
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, size, quantity } });

  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider value={{ state, dispatch, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
