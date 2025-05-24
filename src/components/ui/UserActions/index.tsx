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
      <Link to={ROUTES.profile} aria-label="profile" className="group relative">
        <FiUser
          size={32}
          className="text-gray-600 duration-200 hover:text-gray-900"
        />
        <div className="absolute inset-0 -top-1/4 -left-1/4 -z-1 aspect-square w-[150%] rounded-full bg-radial from-slate-300 to-slate-50 opacity-0 blur-sm duration-200 group-hover:opacity-80" />
      </Link>
      <Link
        to={ROUTES.wishlist}
        aria-label="wishlist"
        className="xs:block group hidden"
      >
        <div className="relative">
          <IoHeartOutline
            size={32}
            className="text-gray-600 duration-200 hover:text-gray-900"
          />
          <div className="bg-red absolute top-[-18%] right-[-25%] inline-flex h-[22px] w-[22px] items-center justify-center rounded-full text-sm text-white">
            {list.length}
          </div>
          <div className="absolute inset-0 -top-1/4 -left-1/4 -z-1 aspect-square w-[150%] rounded-full bg-radial from-slate-300 to-slate-50 opacity-0 blur-sm duration-200 group-hover:opacity-80" />
        </div>
      </Link>
      <Link
        to={ROUTES.cart}
        aria-label="cart"
        className="xs:block group hidden"
      >
        <div className="relative">
          <IoBagOutline
            size={32}
            className="text-gray-600 duration-200 hover:text-gray-900"
          />
          <div className="bg-red absolute top-[-18%] right-[-25%] inline-flex h-[22px] w-[22px] items-center justify-center rounded-full text-sm text-white">
            {cart.length}
          </div>
          <div className="absolute inset-0 -top-1/4 -left-1/4 -z-1 aspect-square w-[150%] rounded-full bg-radial from-slate-300 to-slate-50 opacity-0 blur-sm duration-200 group-hover:opacity-80" />
        </div>
      </Link>
    </div>
  );
};
