import toast from 'react-hot-toast';
import { FaArrowLeft } from 'react-icons/fa';
import { IoHeartOutline } from 'react-icons/io5';
import { Link } from 'react-router';
import { twMerge } from 'tailwind-merge';

import { ROUTES } from '@lib/constants';
import { useAppDispatch, useAppSelector } from '@store';
import { toggleWishlistItem } from '@store/slices/wishlistSlice';
import { ProductItem } from '@types';

interface WishListButtonProps {
  item: ProductItem;
}

export const WishListButton = ({ item }: WishListButtonProps) => {
  const dispatch = useAppDispatch();
  const { list } = useAppSelector((state) => state.wishlistSlice);

  const availableItem = list.find((i) => i._id == item._id);

  const generalClasses =
    'font-medium shadow-xs shadow-red-200 w-full h-full justify-center cursor-pointer self-start inline-flex items-center py-1.5 px-3 rounded-full duration-200';

  const handleAddBtn = () => {
    dispatch(toggleWishlistItem(item));

    toast.success(`${item.name.slice(0, 12).trim()}...  added to wishlist!`, {
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
            'gap-2 border-1 border-red text-white bg-red hover:bg-red-700',
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
            'gap-1 text-red border-1 border-red hover:text-white hover:bg-red',
          )}
        >
          <span>Add to wishlist</span>
          <IoHeartOutline className="shrink-0" size={24} />
        </button>
      )}
    </>
  );
};
