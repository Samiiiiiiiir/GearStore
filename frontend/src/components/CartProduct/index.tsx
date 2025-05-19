import toast from 'react-hot-toast';
import { FaRegCheckCircle } from 'react-icons/fa';
import { IoMdClose, IoMdCloseCircle } from 'react-icons/io';
import { Link } from 'react-router';

import { QuantityControlButton } from '@components/QuantityControlButton';
import { ROUTES } from '@constants';
import { formatPrice } from '@helpers';
import { useAppDispatch, useAppSelector } from '@store';
import { removeFromCart } from '@store/slices/cartSlice';
import { ProductItem } from '@types';

import { PriceTag } from './../PriceTag';

interface CartProductProps {
  item: ProductItem;
}

export const CartProduct = ({ item }: CartProductProps) => {
  const dispatch = useAppDispatch();

  const { cart } = useAppSelector((state) => state.cartSlice);

  const quantity = cart.find((i) => i.id == item._id)?.quantity;

  const handleDeleteBtn = () => {
    dispatch(removeFromCart(item._id));
    toast.success(`${item.name.slice(0, 20).trim()} deleted successfully!`, {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  return (
    <>
      {quantity ? (
        <div className="py-8 flex gap-8 border-y-gray-300 border-b-1 max-w-full">
          <Link to={`${ROUTES.products}/${item._id}`} className="shrink-0">
            <img
              src={item.images[0]}
              alt=""
              className="h-21 w-21 sm:h-42 sm:w-42 rounded-md object-scale-down border border-blue/30 hover:border-blue duration-200 p-2"
            />
          </Link>
          <div className="flex flex-col gap-3 justify-between grow">
            <div>
              <div className="flex justify-between gap-8 items-start">
                <Link
                  to={`${ROUTES.products}/${item._id}`}
                  className="block md:text-lg font-semibold mb-1 text-gray-800 hover:text-black duration-200"
                >
                  <span className="line-clamp-2">{item.name}</span>
                </Link>
                <button
                  onClick={handleDeleteBtn}
                  className="cursor-pointer text-gray-800 hover:text-red-600 duration-300"
                >
                  <IoMdClose size={26} />
                </button>
              </div>
              <p className="text-sm">
                Brand: <span className="font-semibold">{item.brand}</span>
              </p>
              <p className="text-sm">
                Category: <span className="font-semibold">{item.category}</span>
              </p>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <PriceTag
                regularPrice={item.regularPrice * quantity}
                discountedPrice={item.discountedPrice * quantity}
                className="text-lg"
              />
              <QuantityControlButton item={item} className="self-start" />
            </div>
            <div>
              <div className="flex gap-2 items-center text-gray-500 font-medium mb-0.5">
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
              <p className="text-sm md:text-base">
                You are saving{' '}
                <span className="text-green font-bold">
                  {formatPrice(
                    (item.regularPrice - item.discountedPrice) * quantity,
                  )}
                </span>{' '}
                upon purchase
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
