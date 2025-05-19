import { createBrowserRouter, RouterProvider } from 'react-router';

import { MainLayout } from '@layouts/MainLayout';
import { Cancel } from '@pages/Cancel/CancelPage';
import { Cart } from '@pages/Cart/CartPage';
import { Home } from '@pages/Home/HomePage';
import { NotFound } from '@pages/NotFound/NotFoundPage';
import { Orders } from '@pages/Orders/OrdersPage';
import { ProductItem } from '@pages/ProductItem/ProductItemPage';
import { Products } from '@pages/Products/ProductsPage';
import { Profile } from '@pages/Profile/ProfilePage';
import { Success } from '@pages/Success/SuccessPage';
import { Wishlist } from '@pages/Wishlist/WishlistPage';

import { ROUTES } from './routes';

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
