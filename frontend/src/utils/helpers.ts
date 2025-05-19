import { ProductItem } from '@types';

export function calculateAmount(arr: ProductItem[]) {
  return arr.reduce(
    (acc, item) => acc + (item.discountedPrice * item.quantity || 0),
    0,
  );
}

export function formatPrice(price: number) {
  const usdFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return usdFormatter.format(price);
}
