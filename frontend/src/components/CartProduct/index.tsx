import { Link } from 'react-router';
import { useAppSelector } from '../../store';
import { ProductItem } from '../../types';
import { formatPrice } from '../../helpers';
import { AddToCartButton } from '../AddToCartButton';
import { IoMdClose, IoMdCloseCircle } from 'react-icons/io';
import { FaRegCheckCircle } from 'react-icons/fa';

interface CartProductProps {
  item: ProductItem;
}

export const CartProduct = ({ item }: CartProductProps) => {
  const cart = useAppSelector((state) => state.cartSlice.cart);

  const quantity = cart.find((i) => i.id == item._id)?.quantity;

  const handleDeleteBtn = () => {
    console.log('delete');
  };

  return (
    <>
      {quantity ? (
        <div className="py-8 flex gap-8 border-y-gray-300 border-t-1 max-w-[900px]">
          <Link to={`/products/${item._id}`} className="shrink-0">
            <img
              src={item.images[0]}
              alt=""
              className="h-24 w-24 sm:h-48 sm:w-48 rounded-md object-scale-down border border-blue/30 hover:border-blue duration-200 p-2"
            />
          </Link>
          <div className="flex flex-col gap-3 justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-0.5">
                {`${item.name.slice(0, 80)}...`}
              </h3>
              <p className="text-sm">
                Brand: <span className="font-semibold">{item.brand}</span>
              </p>
              <p className="text-sm">
                Category: <span className="font-semibold">{item.category}</span>
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xl font-semibold">
                {formatPrice(item.discountedPrice)}
              </span>
              <AddToCartButton item={item} className="gap-5">
                Add to cart
              </AddToCartButton>
            </div>
            <div>
              <div className="flex gap-2 items-center text-gray-500 font-medium">
                {item.isStock ? (
                  <>
                    <FaRegCheckCircle color="green" size={22} />
                    <span>In stock</span>
                  </>
                ) : (
                  <>
                    <IoMdCloseCircle color="red" size={22} />
                    <span>Out of stock</span>
                  </>
                )}
              </div>
              <p>
                You are saving{' '}
                <span className="text-green font-bold">
                  {formatPrice(item.regularPrice - item.discountedPrice)}
                </span>{' '}
                upon purchase
              </p>
            </div>
          </div>
          <button
            onClick={handleDeleteBtn}
            className="self-start cursor-pointer text-gray-600 hover:text-gray-900 duration-200"
          >
            <IoMdClose size={26} />
          </button>
        </div>
      ) : null}
    </>
  );
};
