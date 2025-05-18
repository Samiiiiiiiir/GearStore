import axios from 'axios';

import { baseUrl, stripePublishKey } from '@lib/constants';
import { useAppSelector } from '@store';
import { loadStripe } from '@stripe/stripe-js';
import { ProductItem } from '@types';

interface CheckoutButtonProps {
  products: ProductItem[];
}

export const CheckoutButton = ({ products }: CheckoutButtonProps) => {
  const { user } = useAppSelector((state) => state.userSlice);

  const handleClick = async () => {
    if (user) {
      const stripe = await loadStripe(stripePublishKey);

      const { data } = await axios.post(`${baseUrl}/checkout`, {
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
        className={`${user ? 'bg-gray-700 hover:bg-gray-800 cursor-pointer duration-300' : 'bg-gray-500 cursor-not-allowed'} w-full text-white text-center rounded-md border border-transparent px-4 py-3`}
      >
        Checkout
      </button>
      {!user && (
        <span className="block text-center text-red-500 font-semibold mt-1">
          To place an order you need to sign in!
        </span>
      )}
    </>
  );
};
