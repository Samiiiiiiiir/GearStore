import { useEffect, useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FaArrowLeft } from 'react-icons/fa6';

import { emptyCart } from '@assets/index';
import { CheckoutButton } from '@components/ui/CheckoutButton';
import { FormattedPrice } from '@components/ui/FormattedPrice';
import { LinkButton } from '@components/ui/LinkButton';
import { PageLoader } from '@components/ui/PageLoader';
import { Title } from '@components/ui/Title';
import { ROUTES } from '@router/routes';
import { useGetCartProductsQuery } from '@services/api/publicApiSlice';
import { clearCart } from '@services/state/slices/cartSlice';
import { useAppDispatch, useAppSelector } from '@services/state/store';
import { SHIPPING_ESTIMATE, TAX_ESTIMATE } from '@utils';

import { CartProduct } from './CartProduct';

const Cart = () => {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cartSlice);

  const [regularPrice, setRegularPrice] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);

  const { isFetching, isLoading, isSuccess, data } =
    useGetCartProductsQuery(cart);

  useEffect(() => {
    if (data) {
      let regularPrice = 0;
      let discountedPrice = 0;

      data.forEach((item) => {
        discountedPrice += item.discountedPrice * item.quantity;
        regularPrice += item.regularPrice * item.quantity;
      });

      setRegularPrice(regularPrice);
      setDiscountedPrice(discountedPrice);
    }
  }, [cart, data, isLoading, isFetching]);

  const handleClearCartBtn = () => {
    if (confirm('Are you sure?')) {
      dispatch(clearCart());
    }
  };

  return (
    <div>
      {cart.length > 0 ? (
        <>
          {(isFetching || isLoading) && <PageLoader />}
          {isSuccess && (
            <>
              <div className="grid gap-8 lg:grid-cols-[1fr_38%]">
                <div>
                  <div className="flex items-center justify-between">
                    <Title className="mb-4 text-4xl font-bold text-gray-900 capitalize">
                      shopping cart
                    </Title>
                    <button
                      onClick={handleClearCartBtn}
                      className="bg-red flex aspect-square w-10 cursor-pointer items-center justify-center gap-1 rounded-full text-white duration-200 hover:bg-red-700"
                    >
                      <FaRegTrashAlt size={18} />
                    </button>
                  </div>
                  <ul>
                    {data.map((item) => (
                      <li key={item._id}>
                        <CartProduct item={item} />
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="self-start rounded-lg bg-gray-50 p-6 text-gray-800">
                  <h3 className="mb-3 text-xl font-semibold">Order summary</h3>
                  <div className="flex items-center justify-between border-b-1 border-gray-300 py-5">
                    <span>Subtotal</span>
                    <FormattedPrice
                      price={regularPrice}
                      className="font-medium"
                    />
                  </div>
                  <div className="flex items-center justify-between border-b-1 border-gray-300 py-5">
                    <span>Shipping estimate</span>
                    <FormattedPrice
                      price={SHIPPING_ESTIMATE}
                      className="font-medium"
                    />
                  </div>
                  <div className="flex items-center justify-between border-b-1 border-gray-300 py-5">
                    <span>Tax estimate</span>
                    <FormattedPrice
                      price={TAX_ESTIMATE}
                      className="font-medium"
                    />
                  </div>
                  <div className="flex items-center justify-between border-b-1 border-gray-300 py-5">
                    <span className="font-semibold">Total Discount</span>
                    <FormattedPrice
                      price={regularPrice - discountedPrice}
                      className="font-medium"
                    />
                  </div>
                  <div className="mb-1 flex items-center justify-between py-5 text-lg font-bold">
                    <span>Order total</span>
                    <FormattedPrice
                      price={discountedPrice + SHIPPING_ESTIMATE + TAX_ESTIMATE}
                    />
                  </div>
                  <CheckoutButton products={data} />
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center">
          <div className="flex w-full flex-wrap items-center justify-evenly gap-6">
            <div className="text-center sm:text-start">
              <Title className="mb-2">Cart is empty!</Title>
              <p className="text-lg text-gray-500 sm:text-xl">
                Looks like you haven’t added anything yet
              </p>
            </div>
            <LinkButton to={ROUTES.products}>
              <FaArrowLeft />
              <span>Start Shopping</span>
            </LinkButton>
          </div>
          <div className="max-w-[460px]">
            <img
              loading="lazy"
              src={emptyCart}
              alt=""
              className="object-scale-down"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
