import { HTMLAttributes } from 'react';
import toast from 'react-hot-toast';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';

import { addToCart, decreaseQuantity } from '@services/state/slices/cartSlice';
import { useAppDispatch, useAppSelector } from '@services/state/store';
import { ProductItem } from '@types';

interface QuantityControlButtonProps extends HTMLAttributes<HTMLDivElement> {
  item: ProductItem;
}

export const QuantityControlButton = ({
  item,
  className,
  ...props
}: QuantityControlButtonProps) => {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cartSlice);

  const availableItem = cart.find((cartItem) => cartItem.id == item._id);

  const classes = twMerge('flex items-center gap-6 justify-center', className);

  const handleAddBtn = () => {
    dispatch(addToCart(item._id));

    toast.success(`${item.name.slice(0, 12).trim()}... added to cart!`, {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  const handleDecreaseBtn = () => {
    if (availableItem?.quantity && availableItem?.quantity > 1) {
      dispatch(decreaseQuantity(item._id));

      toast.success(
        `${item.name.slice(0, 12).trim()}... decreased successfully!`,
        {
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        },
      );
    }
  };

  return (
    <>
      {availableItem && (
        <div className={classes} {...props}>
          <button
            disabled={availableItem.quantity <= 1}
            onClick={handleDecreaseBtn}
            className="rounded-full bg-[#f4f4f4] text-black hover:bg-black hover:text-white disabled:opacity-50 cursor-pointer disabled:cursor-default w-9 h-9 xl:w-10 xl:h-10 flex justify-center items-center text-xl leading-none duration-200"
          >
            <FaMinus size={16} />
          </button>
          <span className="font-semibold text-lg">
            {availableItem.quantity}
          </span>
          <button
            onClick={handleAddBtn}
            className="rounded-full bg-[#f4f4f4] text-black hover:bg-black hover:text-white cursor-pointer w-9 h-9 xl:w-10 xl:h-10 flex justify-center items-center text-xl leading-none duration-200"
          >
            <FaPlus size={16} />
          </button>
        </div>
      )}
    </>
  );
};
