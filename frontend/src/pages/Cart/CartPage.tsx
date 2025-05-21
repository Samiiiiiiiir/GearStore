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
              <div className="grid lg:grid-cols-[1fr_38%] gap-8">
                <div>
                  <div className="flex justify-between items-center">
                    <Title className="capitalize text-4xl font-bold text-gray-900 mb-4">
                      shopping cart
                    </Title>
                    <button
                      onClick={handleClearCartBtn}
                      className="cursor-pointer duration-200 flex gap-1 items-center bg-red text-white hover:bg-red-700 py-2 px-3 rounded-full"
                    >
                      Clear <FaRegTrashAlt size={20} />
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
                <div className="bg-gray-50 rounded-lg p-6 self-start text-gray-800">
                  <h3 className="text-xl font-semibold mb-3">Order summary</h3>
                  <div className="flex items-center justify-between py-5 border-b-1 border-gray-300">
                    <span>Subtotal</span>
                    <FormattedPrice
                      price={regularPrice}
                      className="font-medium"
                    />
                  </div>
                  <div className="flex items-center justify-between py-5 border-b-1 border-gray-300 ">
                    <span>Shipping estimate</span>
                    <FormattedPrice
                      price={SHIPPING_ESTIMATE}
                      className="font-medium"
                    />
                  </div>
                  <div className="flex items-center justify-between py-5 border-b-1 border-gray-300 ">
                    <span>Tax estimate</span>
                    <FormattedPrice
                      price={TAX_ESTIMATE}
                      className="font-medium"
                    />
                  </div>
                  <div className="flex items-center justify-between py-5 border-b-1 border-gray-300 ">
                    <span className="font-semibold">Total Discount</span>
                    <FormattedPrice
                      price={regularPrice - discountedPrice}
                      className="font-medium"
                    />
                  </div>
                  <div className="flex items-center justify-between py-5 mb-1 text-lg font-bold">
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
          <div className="flex justify-evenly items-center gap-6 w-full flex-wrap">
            <div className="text-center sm:text-start">
              <Title className="text-3xl lg:text-4xl font-semibold mb-3">
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
