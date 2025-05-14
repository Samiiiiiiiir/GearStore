import { FaArrowLeft } from 'react-icons/fa6';
import { LinkButton } from '../../components/LinkButton';
import { Title } from '../../components/Title';
import { WishlistProduct } from '../../components/WishlistProduct';
import { useAppSelector } from '../../store';

export const Wishlist = () => {
  const { list } = useAppSelector((state) => state.wishlistSlice);

  return (
    <div className="grid gap-6">
      {list.length > 0 ? (
        <>
          <Title className="mb-1">Wishlist</Title>
          {list.map((item) => (
            <WishlistProduct key={item._id} item={item} />
          ))}
        </>
      ) : (
        <div className="flex flex-col items-center gap-4 mt-14">
          <Title>Nothing added to Wishlist</Title>
          <p className="text-gray-600 text-lg">
            Looks like you haven’t saved any items yet. Browse our catalog and
            add what you love!
          </p>
          <LinkButton to="/products">
            <FaArrowLeft />
            <span>Browse Products</span>
          </LinkButton>
        </div>
      )}
    </div>
  );
};
