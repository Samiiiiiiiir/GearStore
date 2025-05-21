import { FiUser } from 'react-icons/fi';
import { IoBagOutline, IoHeartOutline } from 'react-icons/io5';
import { Link } from 'react-router';

import { ROUTES } from '@router/routes';
import { useAppSelector } from '@services/state/store';

export const UserActions = () => {
  const { cart } = useAppSelector((state) => state.cartSlice);
  const { list } = useAppSelector((state) => state.wishlistSlice);

  return (
    <div className="flex items-center gap-3 sm:gap-4">
      <Link to={ROUTES.profile}>
        <FiUser
          size={32}
          className="text-gray-600 duration-200 hover:text-gray-950"
        />
      </Link>
      <Link to={ROUTES.wishlist}>
        <div className="relative">
          <IoHeartOutline
            size={32}
            className="text-gray-600 duration-200 hover:text-gray-950"
          />
          <div className="bg-red absolute top-[-18%] right-[-25%] inline-flex h-[22px] w-[22px] items-center justify-center rounded-full text-sm text-white">
            {list.length}
          </div>
        </div>
      </Link>
      <Link to={ROUTES.cart}>
        <div className="relative">
          <IoBagOutline
            size={32}
            className="text-gray-600 duration-200 hover:text-gray-950"
          />
          <div className="bg-red absolute top-[-18%] right-[-25%] inline-flex h-[22px] w-[22px] items-center justify-center rounded-full text-sm text-white">
            {cart.length}
          </div>
        </div>
      </Link>
    </div>
  );
};
