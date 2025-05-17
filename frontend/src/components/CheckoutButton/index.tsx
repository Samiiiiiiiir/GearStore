import { useAppSelector } from '@store';

export const CheckoutButton = () => {
  const { user } = useAppSelector((state) => state.userSlice);

  const handleClick = () => {
    console.log('yo');
  };

  return (
    <>
      <button
        onClick={handleClick}
        disabled={Boolean(!user)}
        className={`${user ? 'bg-gray-700 hover:bg-gray-800 cursor-pointer duration-300' : 'bg-gray-500 cursor-not-allowed'} w-full text-white text-center rounded-md border border-transparent px-4 py-3`}
      >
        Checkout
      </button>
      {!user && (
        <span className="block text-center text-red-500 font-semibold mt-1">
          To place an order you need to sign in!
        </span>
      )}
    </>
  );
};
