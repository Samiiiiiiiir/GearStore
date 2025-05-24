import axios from 'axios';

import { useAppSelector } from '@services/state/store';
import { loadStripe } from '@stripe/stripe-js';
import { ProductItem } from '@types';
import { BASE_URL, STRIPE_PUBLISH_KEY } from '@utils';

interface CheckoutButtonProps {
  products: ProductItem[];
}

export const CheckoutButton = ({ products }: CheckoutButtonProps) => {
  const { user } = useAppSelector((state) => state.userSlice);

  const handleClick = async () => {
    if (user) {
      const stripe = await loadStripe(STRIPE_PUBLISH_KEY);

      const { data } = await axios.post(`${BASE_URL}/checkout`, {
        products,
        email: user.email,
      });

      const res = await stripe?.redirectToCheckout({ sessionId: data.id });

      if (res?.error) {
        console.error(res.error.message);
      }
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        disabled={Boolean(!user)}
        className={`${user ? 'cursor-pointer bg-gray-700 duration-300 hover:bg-gray-800' : 'cursor-not-allowed bg-gray-500'} w-full rounded-md border border-transparent px-4 py-3 text-center text-white`}
      >
        Checkout
      </button>
      {!user && (
        <span className="mt-1 block text-center font-semibold text-red-500">
          To place an order you need to sign in!
        </span>
      )}
    </>
  );
};
