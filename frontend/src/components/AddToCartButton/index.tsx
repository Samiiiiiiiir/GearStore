import { ButtonHTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { ProductItem } from '../../types';
import { useAppDispatch, useAppSelector } from '../../store';
import { addToCart, decreaseQuantity } from '../../store/slices/cartSlice';
import toast from 'react-hot-toast';
import { FaMinus, FaPlus } from 'react-icons/fa6';

interface AddToCartButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  item: ProductItem;
}

export const AddToCartButton = ({
  children,
  className,
  item,
  ...props
}: AddToCartButtonProps) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cartSlice.cart);

  const availableItem = cart.find((cartItem) => cartItem.id == item._id);

  const classes = twMerge(
    'bg-[#f7f7f7] uppercase text-xs py-3 text-center rounded-full font-semibold hover:bg-black hover:text-white hover:scale 105 duration-200 cursor-pointer disabled:text-white/80 disabled:bg-black/50 disabled:cursor-not-allowed',
    className
  );

  const handleAddBtn = () => {
    dispatch(addToCart(item._id));

    toast.success(`${item.name.slice(0, 12).trim()}... added to cart!`);
  };

  const handleDecreaseBtn = () => {
    dispatch(decreaseQuantity(item._id));

    toast.success(
      `${item.name.slice(0, 12).trim()}... decreased successfully!`
    );
  };

  return (
    <>
      {availableItem ? (
        <div className="flex items-center gap-10 justify-center">
          <button
            onClick={handleDecreaseBtn}
            className="rounded-full bg-[#f7f7f7] text-black hover:bg-black hover:text-white cursor-pointer w-10 h-10 flex justify-center items-center text-xl leading-none duration-200"
          >
            <FaMinus size={16} />
          </button>
          <span className="font-semibold text-lg">
            {availableItem.quantity}
          </span>
          <button
            onClick={handleAddBtn}
            className="rounded-full bg-[#f7f7f7] text-black hover:bg-black hover:text-white cursor-pointer w-10 h-10 flex justify-center items-center text-xl leading-none duration-200"
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
