import { Product } from './product';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: number;
}

export interface CartState {
  items: CartItem[];
}

export type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; size: number } }
  | { type: 'REMOVE_ITEM'; payload: { productId: string; size: number } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; size: number; quantity: number } }
  | { type: 'CLEAR_CART' };
