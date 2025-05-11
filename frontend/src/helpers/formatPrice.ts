export function formatPrice(price: number) {
  const usdFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return usdFormatter.format(price);
}
