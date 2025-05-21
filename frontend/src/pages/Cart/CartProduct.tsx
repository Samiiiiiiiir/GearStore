import toast from 'react-hot-toast';
import { FaRegCheckCircle } from 'react-icons/fa';
import { IoMdClose, IoMdCloseCircle } from 'react-icons/io';
import { Link } from 'react-router';

import { PriceTag } from '@components/ui/PriceTag';
import { QuantityControlButton } from '@components/ui/QuantityControlButton';
import { ROUTES } from '@router/routes';
import { removeFromCart } from '@services/state/slices/cartSlice';
import { useAppDispatch, useAppSelector } from '@services/state/store';
import { ProductItem } from '@types';
import { formatPrice } from '@utils';

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
        <div className="flex max-w-full gap-8 border-b-1 border-y-gray-300 py-8">
          <Link to={`${ROUTES.products}/${item._id}`} className="shrink-0">
            <img
              loading="lazy"
              src={item.images[0]}
              alt=""
              className="border-blue/30 hover:border-blue h-21 w-21 rounded-md border object-scale-down p-2 duration-200 sm:h-42 sm:w-42"
            />
          </Link>
          <div className="flex grow flex-col justify-between gap-3">
            <div>
              <div className="flex items-start justify-between gap-8">
                <Link
                  to={`${ROUTES.products}/${item._id}`}
                  className="mb-1 block font-semibold text-gray-800 duration-200 hover:text-black md:text-lg"
                >
                  <span className="line-clamp-2">{item.name}</span>
                </Link>
                <button
                  onClick={handleDeleteBtn}
                  className="cursor-pointer text-gray-800 duration-300 hover:text-red-600"
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
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <PriceTag
                regularPrice={item.regularPrice * quantity}
                discountedPrice={item.discountedPrice * quantity}
                className="text-lg"
              />
              <QuantityControlButton item={item} className="self-start" />
            </div>
            <div>
              <div className="mb-0.5 flex items-center gap-2 font-medium text-gray-500">
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
