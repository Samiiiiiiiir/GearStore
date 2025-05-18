import { FiUser } from 'react-icons/fi';
import { IoBagOutline, IoHeartOutline } from 'react-icons/io5';
import { Link } from 'react-router';

import { ROUTES } from '@lib/constants';
import { useAppSelector } from '@store';

export const UserActions = () => {
  const { cart } = useAppSelector((state) => state.cartSlice);
  const { list } = useAppSelector((state) => state.wishlistSlice);

  return (
    <div className="flex items-center gap-3 sm:gap-4">
      <Link to={ROUTES.profile}>
        <FiUser size={32} className="hover:text-blue duration-200" />
      </Link>
      <Link to={ROUTES.wishlist}>
        <div className="relative">
          <IoHeartOutline size={32} className="hover:text-blue duration-200" />
          <div className="absolute top-[-18%] right-[-25%] inline-flex items-center justify-center bg-red text-white text-sm rounded-full w-[22px] h-[22px]">
            {list.length}
          </div>
        </div>
      </Link>
      <Link to={ROUTES.cart}>
        <div className="relative">
          <IoBagOutline size={32} className="hover:text-blue duration-200" />
          <div className="absolute top-[-18%] right-[-25%] inline-flex items-center justify-center bg-red text-white text-sm rounded-full w-[22px] h-[22px]">
            {cart.length}
          </div>
        </div>
      </Link>
    </div>
  );
};
