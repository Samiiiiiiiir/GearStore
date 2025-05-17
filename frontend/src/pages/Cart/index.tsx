import { FaArrowLeft } from 'react-icons/fa6';

import { useGetCartProductsQuery } from '@api/publicApiSlice';
import emptyCart from '@assets/empty-cart.png';
import { CartProduct } from '@components/CartProduct';
import { CheckoutButton } from '@components/CheckoutButton';
import { LinkButton } from '@components/LinkButton';
import { PageLoader } from '@components/PageLoader';
import { Title } from '@components/Title';
import { formatPrice } from '@helpers';
import { ROUTES } from '@router/AppRouter';
import { useAppSelector } from '@store';

const SHIPPING_ESTIMATE = 25;
const TAX_ESTIMATE = 15;

export const Cart = () => {
  const { cart, regularPrice, discountedPrice } = useAppSelector(
    (state) => state.cartSlice,
  );

  const { isFetching, isLoading, isSuccess, data } =
    useGetCartProductsQuery(cart);

  const orderTotal = formatPrice(
    discountedPrice + SHIPPING_ESTIMATE + TAX_ESTIMATE,
  );

  return (
    <div>
      {cart.length > 0 ? (
        <>
          {(isFetching || isLoading) && <PageLoader />}
          {isSuccess && (
            <>
              <Title className="capitalize text-4xl font-bold text-gray-900 mb-4">
                shopping cart
              </Title>
              <div className="grid lg:grid-cols-[1fr_38%] gap-8">
                <ul>
                  {data.map((item) => (
                    <li key={item._id}>
                      <CartProduct item={item} />
                    </li>
                  ))}
                </ul>
                <div className="bg-gray-50 rounded-lg p-6 self-start text-gray-800">
                  <h3 className="text-xl font-medium mb-3">Order summary</h3>
                  <div className="flex items-center justify-between py-5 border-b-1 border-gray-300">
                    <span>Subtotal</span>
                    <span className="font-medium">
                      {formatPrice(regularPrice)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-5 border-b-1 border-gray-300 ">
                    <span>Shipping estimate</span>
                    <span className="font-medium">
                      {formatPrice(SHIPPING_ESTIMATE)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-5 border-b-1 border-gray-300 ">
                    <span>Tax estimate</span>
                    <span className="font-medium">
                      {formatPrice(TAX_ESTIMATE)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-5 border-b-1 border-gray-300 ">
                    <span className="font-semibold">Total Discount</span>
                    <span className="font-medium">
                      {formatPrice(regularPrice - discountedPrice)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-5 mb-1">
                    <span className="font-semibold">Order total</span>
                    <span className="text-xl font-bold">{orderTotal}</span>
                  </div>
                  <CheckoutButton products={data} />
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center">
          <div className="flex justify-evenly items-center gap-6 w-full flex-wrap">
            <div className="text-center sm:text-start">
              <Title className="text-3xl lg:text-[42px] font-semibold mb-3">
                Cart is empty!
              </Title>
              <p className="text-gray-500 text-lg sm:text-xl">
                Looks like you haven’t added anything yet
              </p>
            </div>
            <LinkButton to={ROUTES.products}>
              <FaArrowLeft />
              <span>Start Shopping</span>
            </LinkButton>
          </div>
          <div className="max-w-[460px]">
            <img src={emptyCart} alt="" className="object-scale-down" />
          </div>
        </div>
      )}
    </div>
  );
};
