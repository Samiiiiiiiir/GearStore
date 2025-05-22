import { IoMdClose } from 'react-icons/io';
import { Link } from 'react-router';

import { LinkButton } from '@components/ui/LinkButton';
import { ROUTES } from '@router/routes';
import { toggleWishlistItem } from '@services/state/slices/wishlistSlice';
import { useAppDispatch } from '@services/state/store';
import { ProductItem } from '@types';

interface WishlistProductProps {
  item: ProductItem;
}

export const WishlistProduct = ({ item }: WishlistProductProps) => {
  const dispatch = useAppDispatch();

  const handleDeleteBtn = () => {
    dispatch(toggleWishlistItem(item));
  };

  return (
    <div className="flex gap-4 border-b-1 border-y-gray-300 py-6 sm:gap-6">
      <Link to={`${ROUTES.products}/${item._id}`} className="shrink-0">
        <img
          loading="lazy"
          src={item.images[0]}
          alt=""
          className="border-blue/30 hover:border-blue h-30 w-30 rounded-md border object-scale-down p-2 duration-200 sm:h-42 sm:w-42"
        />
      </Link>
      <div className="flex flex-col gap-3">
        <h3 className="line-clamp-2 font-semibold md:text-xl">{item.name}</h3>
        <p className="line-clamp-3">{item.description}</p>
        <LinkButton
          className="self-start px-4 py-2.5 text-sm sm:text-base md:px-6 md:py-3.5"
          to={`${ROUTES.products}/${item._id}`}
        >
          View Product
        </LinkButton>
      </div>
      <button
        onClick={handleDeleteBtn}
        className="cursor-pointer self-start text-gray-800 duration-300 hover:text-red-600"
      >
        <IoMdClose size={26} />
      </button>
    </div>
  );
};
