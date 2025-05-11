import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';

import { ProductItem } from '../../types';
import { AddToCartButton } from '../AddToCartButton';
import { IoHeartSharp } from 'react-icons/io5';
import { Link } from 'react-router';
import { PriceTag } from '../PriceTag';

interface ProductCardProps {
  item: ProductItem;
  onClick?: () => void;
}

export const ProductCard = ({ item, onClick }: ProductCardProps) => {
  const percentage = Math.round(
    100 - (item.discountedPrice / item.regularPrice) * 100
  );

  return (
    <article className="border border-gray-200 rounded-lg p-2 overflow-hidden hover:border-black/40 duration-200">
      <div className="group w-full h-60 relative overflow-hidden">
        <span className="absolute top-1 left-1 z-2 bg-dark text-white py-1 px-1.5 rounded-md text-sm text-center">
          Save {percentage}%
        </span>
        <Link to={`/products/${item._id}`} onClick={onClick}>
          <img
            src={item.images[0]}
            alt={item.name}
            className="w-full h-full object-scale-down group-hover:scale-110 duration-300"
          />
        </Link>
        <div className="group/inner absolute top-1 right-[-100%] w-9 h-9 flex justify-center items-center z-3 group-hover:right-1 duration-300 bg-black hover:scale-110  rounded-full">
          <IoHeartSharp size={24} className="duration-300 fill-red" />
        </div>
      </div>
      <div className="pt-2 px-2 grid gap-2">
        <h3 className="text-sm uppercase font-semibold text-light">
          {item.overView}
        </h3>
        <h2 className="text-lg font-semibold line-clamp-2" title={item.name}>
          {item.name}
        </h2>
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
        <AddToCartButton item={item}>Add To Cart</AddToCartButton>
      </div>
    </article>
  );
};
