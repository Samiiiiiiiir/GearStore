import { createBrowserRouter, RouterProvider } from 'react-router';

import { MainLayout } from '../layout/MainLayout';

import { Products } from '../pages/Products';
import { NotFound } from '../pages/NotFound';
import { Profile } from '../pages/Profile';
import { Wishlist } from '../pages/Wishlist';
import { ProductItem } from '../pages/ProductItem';
import { Cart } from '../pages/Cart';
import { Orders } from '../pages/Orders';
import { Success } from '../pages/Success';
import { Cancel } from '../pages/Cancel';
import { Home } from '../pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: '/products', element: <Products /> },
      { path: '/products/:id', element: <ProductItem /> },
      { path: '/profile', element: <Profile /> },
      { path: '/cart', element: <Cart /> },
      { path: '/wishlist', element: <Wishlist /> },
      { path: '/orders', element: <Orders /> },
      { path: '/success', element: <Success /> },
      { path: '/cancel', element: <Cancel /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
