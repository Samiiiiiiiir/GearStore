import toast from 'react-hot-toast';
import { IoHeartOutline, IoHeartSharp } from 'react-icons/io5';
import { Link } from 'react-router';

import { ROUTES } from '@lib/constants';
import { Rating } from '@smastrom/react-rating';
import { useAppDispatch, useAppSelector } from '@store';
import { toggleWishlistItem } from '@store/slices/wishlistSlice';
import { ProductItem } from '@types';

import { AddToCartButton } from './../AddToCartButton';
import { PriceTag } from './../PriceTag';

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
    <article className="border border-gray-200 rounded-lg p-2 overflow-hidden hover:border-black/40 duration-200">
      <div className="group w-full h-60 relative overflow-hidden">
        <span className="absolute top-1 left-1 z-2 bg-dark text-white py-1 px-1.5 rounded-md text-xs text-center uppercase">
          Save {percentage}%
        </span>
        <Link to={`${ROUTES.products}/${item._id}`} onClick={onClick}>
          <img
            src={item.images[0]}
            alt={item.name}
            className="w-full h-full object-scale-down group-hover:scale-110 duration-300 select-none"
          />
        </Link>
        <button
          onClick={handleAddToWishlistBtn}
          className="cursor-pointer group/inner absolute top-1 right-[-100%] w-9 h-9 flex justify-center items-center z-3 group-hover:right-1 duration-300 bg-black hover:scale-110  rounded-full"
        >
          {isAdded ? (
            <IoHeartSharp size={24} color="red" />
          ) : (
            <IoHeartOutline size={24} color="white" />
          )}
        </button>
      </div>
      <div className="pt-2 px-2 grid gap-2">
        <h3 className="text-sm uppercase font-semibold text-light">
          {item.overView}
        </h3>
        <h3 className="text-lg font-semibold line-clamp-2" title={item.name}>
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
