import toast from 'react-hot-toast';
import { FaArrowLeft } from 'react-icons/fa';
import { IoHeartOutline } from 'react-icons/io5';
import { Link } from 'react-router';
import { twMerge } from 'tailwind-merge';

import { ROUTES } from '@router/routes';
import { toggleWishlistItem } from '@services/state/slices/wishlistSlice';
import { useAppDispatch, useAppSelector } from '@services/state/store';
import { ProductItem } from '@types';

interface WishListButtonProps {
  item: ProductItem;
}

export const WishListButton = ({ item }: WishListButtonProps) => {
  const dispatch = useAppDispatch();
  const { list } = useAppSelector((state) => state.wishlistSlice);

  const availableItem = list.find((i) => i._id == item._id);

  const generalClasses =
    'font-medium shadow-xs shadow-red-200 w-full min-h-12 h-full justify-center cursor-pointer self-start inline-flex items-center py-1.5 px-3 rounded-full duration-200';

  const handleAddBtn = () => {
    dispatch(toggleWishlistItem(item));

    toast.success(`${item.name.slice(0, 12).trim()}... added to wishlist!`, {
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
          className={twMerge(
            generalClasses,
            'border-red bg-red gap-2 border-1 text-white hover:bg-red-700',
          )}
          to={ROUTES.wishlist}
        >
          <FaArrowLeft />
          <span>View in wishlist</span>
        </Link>
      ) : (
        <button
          onClick={handleAddBtn}
          className={twMerge(
            generalClasses,
            'text-red border-red hover:bg-red gap-1 border-1 hover:text-white',
          )}
        >
          <IoHeartOutline className="shrink-0" size={24} />
          <span>Add to wishlist</span>
        </button>
      )}
    </>
  );
};
