import { Link } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../store';
import { ProductItem } from '../../types';
import { formatPrice } from '../../helpers';
import { AddToCartButton } from '../AddToCartButton';
import { IoMdClose, IoMdCloseCircle } from 'react-icons/io';
import { FaRegCheckCircle } from 'react-icons/fa';
import { PriceTag } from '../PriceTag';
import { removeFromCart } from '../../store/slices/cartSlice';
import toast from 'react-hot-toast';

interface CartProductProps {
  item: ProductItem;
}

export const CartProduct = ({ item }: CartProductProps) => {
  const cart = useAppSelector((state) => state.cartSlice.cart);
  const dispatch = useAppDispatch();

  const quantity = cart.find((i) => i.id == item._id)?.quantity;

  const handleDeleteBtn = () => {
    if (confirm('Are you sure?')) {
      dispatch(removeFromCart(item._id));
      toast.success(`${item.name.slice(0, 20).trim()} deleted successfully!`, {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    }
  };

  return (
    <>
      {quantity ? (
        <div className="py-8 flex justify-between gap-8 border-y-gray-300 border-b-1">
          <Link to={`/products/${item._id}`} className="shrink-0">
            <img
              src={item.images[0]}
              alt=""
              className="h-21 w-21 sm:h-42 sm:w-42 rounded-md object-scale-down border border-blue/30 hover:border-blue duration-200 p-2"
            />
          </Link>
          <div className="flex flex-col gap-3 justify-between">
            <div>
              <Link
                to={`/products/${item._id}`}
                className="block text-lg font-semibold mb-1 text-gray-800 hover:text-black duration-200"
              >
                {`${item.name.slice(0, 80)}...`}
              </Link>
              <p className="text-sm">
                Brand: <span className="font-semibold">{item.brand}</span>
              </p>
              <p className="text-sm">
                Category: <span className="font-semibold">{item.category}</span>
              </p>
            </div>
            <div className="flex items-center gap-4">
              <PriceTag
                regularPrice={item.regularPrice * quantity}
                discountedPrice={item.discountedPrice * quantity}
                className="text-lg"
              />
              <AddToCartButton item={item} inCartClassName="gap-6">
                Add to cart
              </AddToCartButton>
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
              <p>
                You are saving{' '}
                <span className="text-green font-bold">
                  {formatPrice(
                    (item.regularPrice - item.discountedPrice) * quantity
                  )}
                </span>{' '}
                upon purchase
              </p>
            </div>
          </div>
          <button
            onClick={handleDeleteBtn}
            className="self-start cursor-pointer text-gray-800 hover:text-red-600 duration-300"
          >
            <IoMdClose size={26} />
          </button>
        </div>
      ) : null}
    </>
  );
};
