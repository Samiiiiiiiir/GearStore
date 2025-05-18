import { ProductItem } from '@types';

export function calculateAmount(arr: ProductItem[]) {
  return arr.reduce(
    (acc, item) => acc + (item.discountedPrice * item.quantity || 0),
    0,
  );
}
