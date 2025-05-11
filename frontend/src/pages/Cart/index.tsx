import { FaArrowLeft } from 'react-icons/fa6';
import { useGetCartProductsQuery } from '../../api/publicApiSlice';
import { LinkButton } from '../../components/LinkButton';
import { PageLoader } from '../../components/PageLoader';
import { useAppSelector } from '../../store';

import emptyCart from './../../assets/empty-cart.png';

export const Cart = () => {
  const cart = useAppSelector((state) => state.cartSlice.cart);

  const { isFetching, isLoading, isSuccess, data } =
    useGetCartProductsQuery(cart);

  return (
    <div>
      {cart.length > 0 ? (
        <>
          {(isFetching || isLoading) && <PageLoader />}
          {isSuccess && data.map((item) => <div>{item.name}</div>)}
        </>
      ) : (
        <div className="flex flex-col items-center">
          <div className="flex justify-evenly items-center gap-6 w-full flex-wrap">
            <div>
              <h1 className="text-2xl sm:text-4xl font-semibold mb-2">
                Cart is empty!
              </h1>
              <p className="text-gray-500 text-lg sm:text-xl">
                Looks like you haven’t added anything yet.
              </p>
            </div>
            <LinkButton to="/products">
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
