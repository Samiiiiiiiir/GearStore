import { IoBagOutline, IoHeartOutline } from 'react-icons/io5';
import { FiUser } from 'react-icons/fi';
import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../store';
import { calculateCartItems } from '../../helpers';

export const UserActions = () => {
  const [cartItems, setCartItems] = useState(0);

  const cart = useAppSelector((state) => state.cartSlice.cart);
  const list = useAppSelector((state) => state.wishlistSlice.list);

  useEffect(() => {
    setCartItems(calculateCartItems(cart));
  }, [cart]);

  return (
    <div className="flex items-center gap-3 sm:gap-4">
      <Link to="/profile">
        <FiUser size={32} className="hover:text-blue duration-200" />
      </Link>
      <Link to="/wishlist">
        <div className="relative">
          <IoHeartOutline size={32} className="hover:text-blue duration-200" />
          <div className="absolute top-[-18%] right-[-25%] inline-flex items-center justify-center bg-red text-white text-sm rounded-full w-[22px] h-[22px]">
            {list.length}
          </div>
        </div>
      </Link>
      <Link to="/cart">
        <div className="relative">
          <IoBagOutline size={32} className="hover:text-blue duration-200" />
          <div className="absolute top-[-18%] right-[-25%] inline-flex items-center justify-center bg-red text-white text-sm rounded-full w-[22px] h-[22px]">
            {cartItems}
          </div>
        </div>
      </Link>
    </div>
  );
};
