import toast from 'react-hot-toast';
import { IoHeartOutline, IoHeartSharp } from 'react-icons/io5';
import { Link } from 'react-router';

import { AddToCartButton } from '@components/ui/AddToCartButton';
import { PriceTag } from '@components/ui/PriceTag';
import { ROUTES } from '@router/routes';
import { toggleWishlistItem } from '@services/state/slices/wishlistSlice';
import { useAppDispatch, useAppSelector } from '@services/state/store';
import { Rating } from '@smastrom/react-rating';
import { ProductItem } from '@types';

import '@smastrom/react-rating/style.css';

interface ProductCardProps {
  item: ProductItem;
  onClick?: () => void;
}

export const ProductCard = ({ item, onClick }: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const { list } = useAppSelector((state) => state.wishlistSlice);

  const isAdded = list.find((i) => i._id === item._id);

  const percentage = Math.round(
    100 - (item.discountedPrice / item.regularPrice) * 100,
  );

  const handleAddToWishlistBtn = () => {
    dispatch(toggleWishlistItem(item));

    toast.success(
      `${item.name.slice(0, 12).trim()}... ${
        isAdded ? 'removed from wishlist!' : 'added to wishlist!'
      }`,
      {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      },
    );
  };

  return (
    <article className="flex h-full flex-col justify-between overflow-hidden rounded-lg border border-gray-200 p-2 duration-200 hover:border-black/40">
      <div className="group relative h-60 w-full overflow-hidden">
        <span className="bg-dark absolute top-1 left-1 z-2 rounded-md px-1.5 py-1 text-center text-xs text-white uppercase">
          Save {percentage}%
        </span>
        <Link to={`${ROUTES.products}/${item._id}`} onClick={onClick}>
          <img
            loading="lazy"
            src={item.images[0]}
            alt={item.name}
            className="h-full w-full object-scale-down duration-300 select-none group-hover:scale-110"
          />
        </Link>
        <button
          onClick={handleAddToWishlistBtn}
          aria-label={isAdded ? 'Remove from wishlist' : 'Add to wishlist'}
          className="group/inner absolute top-1 right-[-100%] z-3 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-black duration-300 group-hover:right-1 hover:scale-110"
        >
          {isAdded ? (
            <IoHeartSharp size={24} color="red" />
          ) : (
            <IoHeartOutline size={24} color="white" />
          )}
        </button>
      </div>
      <div className="grid gap-2 px-2 pt-2">
        <h3 className="text-light line-clamp-1 text-sm font-semibold uppercase">
          {item.overView}
        </h3>
        <h3 className="line-clamp-2 text-lg font-semibold" title={item.name}>
          {item.name}
        </h3>
        <div title={String(item.rating)}>
          <Rating
            style={{ maxWidth: 100 }}
            value={item.rating}
            readOnly={true}
          />
        </div>
        <PriceTag
          regularPrice={item.regularPrice}
          discountedPrice={item.discountedPrice}
        />
        <AddToCartButton item={item} />
      </div>
    </article>
  );
};
