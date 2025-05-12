import { FaArrowLeft } from 'react-icons/fa6';
import { useGetCartProductsQuery } from '../../api/publicApiSlice';
import { LinkButton } from '../../components/LinkButton';
import { PageLoader } from '../../components/PageLoader';
import { useAppSelector } from '../../store';

import emptyCart from './../../assets/empty-cart.png';
import { CartProduct } from '../../components/CartProduct';

export const Cart = () => {
  const cart = useAppSelector((state) => state.cartSlice.cart);

  const { isFetching, isLoading, isSuccess, data } =
    useGetCartProductsQuery(cart);

  return (
    <div>
      {cart.length > 0 ? (
        <>
          {(isFetching || isLoading) && <PageLoader />}
          {isSuccess && (
            <>
              <h1 className="capitalize text-4xl font-bold text-gray-900 mb-4">
                shopping cart
              </h1>
              <div className="flex">
                <section>
                  <div>
                    {data.map((item) => (
                      <CartProduct key={item._id} item={item} />
                    ))}
                  </div>
                </section>
                <section></section>
              </div>
            </>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center">
          <div className="flex justify-evenly items-center gap-6 w-full flex-wrap">
            <div className="text-center sm:text-start">
              <h1 className="text-4xl lg:text-5xl font-semibold mb-3">
                Cart is empty!
              </h1>
              <p className="text-gray-500 text-lg sm:text-xl">
                Looks like you haven’t added anything yet
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
