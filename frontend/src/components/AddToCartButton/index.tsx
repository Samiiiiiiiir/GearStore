import toast from 'react-hot-toast';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router';
import { twMerge } from 'tailwind-merge';

import { ROUTES } from '@constants';
import { useAppDispatch, useAppSelector } from '@store';
import { addToCart } from '@store/slices/cartSlice';
import { ProductItem } from '@types';

interface AddToCartButtonProps {
  item: ProductItem;
}

export const AddToCartButton = ({ item }: AddToCartButtonProps) => {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cartSlice);

  const availableItem = cart.find((cartItem) => cartItem.id == item._id);

  const generalClasses =
    'py-3 text-center rounded-full font-medium shadow-md w-full';

  const handleAddBtn = () => {
    dispatch(addToCart(item._id));

    toast.success(`${item.name.slice(0, 12).trim()}... added to cart!`, {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  return (
    <>
      {availableItem ? (
        <Link
          to={ROUTES.cart}
          className={twMerge(
            generalClasses,
            'bg-slate-900 text-white hover:bg-slate-700 duration-200 cursor-pointer flex justify-center items-center gap-2',
          )}
        >
          <FaArrowLeft />
          View in cart
        </Link>
      ) : (
        <button
          type="button"
          className={twMerge(
            generalClasses,
            'bg-[#e7e7e7] hover:bg-black hover:text-white duration-200 cursor-pointer',
          )}
          onClick={handleAddBtn}
        >
          Add to cart
        </button>
      )}
    </>
  );
};
