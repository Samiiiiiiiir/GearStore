import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';

import { PageLoader } from '@components/ui/PageLoader';
import { MainLayout } from '@layouts/MainLayout';

import { ROUTES } from './routes';

const Cancel = lazy(() => import('@pages/Cancel/CancelPage'));
const Cart = lazy(() => import('@pages/Cart/CartPage'));
const Home = lazy(() => import('@pages/Home/HomePage'));
const NotFound = lazy(() => import('@pages/NotFound/NotFoundPage'));
const Orders = lazy(() => import('@pages/Orders/OrdersPage'));
const ProductItem = lazy(() => import('@pages/ProductItem/ProductItemPage'));
const Products = lazy(() => import('@pages/Products/ProductsPage'));
const Profile = lazy(() => import('@pages/Profile/ProfilePage'));
const Success = lazy(() => import('@pages/Success/SuccessPage'));
const Wishlist = lazy(() => import('@pages/Wishlist/WishlistPage'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<PageLoader />}>
        <MainLayout />
      </Suspense>
    ),
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
