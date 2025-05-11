import { CartItem } from '../types';

export function calculateCartItems(items: CartItem[]) {
  return items.reduce((acc, cur) => cur.quantity + acc, 0);
}
