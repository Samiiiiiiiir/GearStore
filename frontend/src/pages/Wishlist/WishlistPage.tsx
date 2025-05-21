import { FaArrowLeft } from 'react-icons/fa6';

import { LinkButton } from '@components/ui/LinkButton';
import { Title } from '@components/ui/Title';
import { ROUTES } from '@router/routes';
import { useAppSelector } from '@services/state/store';

import { WishlistProduct } from './WishlistProduct';

const Wishlist = () => {
  const { list } = useAppSelector((state) => state.wishlistSlice);

  return (
    <div className="grid gap-6">
      {list.length > 0 ? (
        <>
          <Title className="mb-1">Wishlist</Title>
          <ul>
            {list.map((item) => (
              <li key={item._id}>
                <WishlistProduct item={item} />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="mt-14 flex flex-col items-center gap-4 text-center">
          <Title>Nothing added to Wishlist</Title>
          <p className="text-lg text-gray-600">
            Looks like you haven’t saved any items yet. Browse our catalog and
            add what you love!
          </p>
          <LinkButton to={ROUTES.products}>
            <FaArrowLeft />
            <span>Browse Products</span>
          </LinkButton>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
