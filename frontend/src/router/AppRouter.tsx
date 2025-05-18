import { createBrowserRouter, RouterProvider } from 'react-router';

import { MainLayout } from '@layout/MainLayout';
import { ROUTES } from '@lib/constants';
import { Cancel } from '@pages/Cancel';
import { Cart } from '@pages/Cart';
import { Home } from '@pages/Home';
import { NotFound } from '@pages/NotFound';
import { Orders } from '@pages/Orders';
import { ProductItem } from '@pages/ProductItem';
import { Products } from '@pages/Products';
import { Profile } from '@pages/Profile';
import { Success } from '@pages/Success';
import { Wishlist } from '@pages/Wishlist';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: ROUTES.main, element: <Home /> },
      { path: ROUTES.products, element: <Products /> },
      { path: ROUTES.productItem, element: <ProductItem /> },
      { path: ROUTES.profile, element: <Profile /> },
      { path: ROUTES.cart, element: <Cart /> },
      { path: ROUTES.wishlist, element: <Wishlist /> },
      { path: ROUTES.orders, element: <Orders /> },
      { path: ROUTES.success, element: <Success /> },
      { path: ROUTES.cancel, element: <Cancel /> },
      { path: ROUTES.notFound, element: <NotFound /> },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
