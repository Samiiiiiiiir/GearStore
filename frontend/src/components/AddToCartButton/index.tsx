import { ButtonHTMLAttributes, ReactNode } from 'react';
import toast from 'react-hot-toast';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { twMerge } from 'tailwind-merge';

import { useAppDispatch, useAppSelector } from '@store';
import { addToCart, decreaseQuantity } from '@store/slices/cartSlice';
import { ProductItem } from '@types';

interface AddToCartButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  item: ProductItem;
  inCartClassName?: string;
  children?: ReactNode;
}

export const AddToCartButton = ({
  children,
  className,
  item,
  inCartClassName,
  ...props
}: AddToCartButtonProps) => {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cartSlice);

  const availableItem = cart.find((cartItem) => cartItem.id == item._id);

  const classes = twMerge(
    'bg-[#f7f7f7] uppercase text-xs py-3 text-center rounded-full font-semibold hover:bg-black hover:text-white hover:scale 105 duration-200 cursor-pointer disabled:text-white/80 disabled:bg-black/50 disabled:cursor-not-allowed',
    className,
  );

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
      {availableItem ? (
        <div
          className={twMerge(
            'flex items-center gap-10 justify-center',
            inCartClassName,
          )}
        >
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
      ) : (
        <button className={classes} {...props} onClick={handleAddBtn}>
          {children}
        </button>
      )}
    </>
  );
};
