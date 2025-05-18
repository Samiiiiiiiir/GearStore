export const baseUrl: string = import.meta.env.VITE_API_URL;
export const stripePublishKey = import.meta.env.VITE_STRIPE_PUBLISH_KEY;

export const SHIPPING_ESTIMATE = 25;
export const TAX_ESTIMATE = 15;

export const ROUTES = {
  main: '/',
  products: '/products',
  productItem: '/products/:id',
  profile: '/profile',
  cart: '/cart',
  wishlist: '/wishlist',
  orders: '/orders',
  success: '/success',
  cancel: '/cancel',
  notFound: '*',
};
