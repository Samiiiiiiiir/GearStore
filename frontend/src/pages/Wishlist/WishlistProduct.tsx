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
    <div className="flex gap-6 border-y-gray-300 border-b-1 py-6">
      <Link to={`${ROUTES.products}/${item._id}`} className="shrink-0">
        <img
          src={item.images[0]}
          alt=""
          className="h-30 w-30 sm:h-42 sm:w-42 rounded-md object-scale-down border border-blue/30 hover:border-blue duration-200 p-2"
        />
      </Link>
      <div className="flex flex-col gap-3">
        <h3 className="font-semibold md:text-xl line-clamp-2">{item.name}</h3>
        <p className="line-clamp-3">{item.description}</p>
        <LinkButton
          className="self-start py-2.5 px-4 md:py-3.5 md:px-6 text-sm sm:text-base"
          to={`${ROUTES.products}/${item._id}`}
        >
          View Product
        </LinkButton>
      </div>
      <button
        onClick={handleDeleteBtn}
        className="self-start cursor-pointer text-gray-800 hover:text-red-600 duration-300"
      >
        <IoMdClose size={26} />
      </button>
    </div>
  );
};
