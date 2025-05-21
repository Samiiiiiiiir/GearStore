import toast from 'react-hot-toast';

import { resetUser } from '@services/state/slices/userSlice';
import { useAppDispatch } from '@services/state/store';
import { IUserData } from '@types';
import { auth } from '@utils';

interface UserInfoProps {
  user: IUserData;
}

export const UserInfo = ({ user }: UserInfoProps) => {
  const dispatch = useAppDispatch();

  const handleSignOutBtn = () => {
    auth.signOut();
    dispatch(resetUser());
    toast.error('Logged out!');
  };

  return (
    <div className="rounded-md bg-gray-900 px-6 py-12 text-white shadow-2xl sm:rounded-3xl sm:px-16 sm:py-18 xl:py-24">
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold tracking-tight sm:text-4xl">
          Welcome back,{' '}
          <span className="underline decoration-1 underline-offset-4">
            {user.firstname} {user.lastname}!
          </span>
        </h2>
        <p className="text-start text-sm leading-6 text-gray-300">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt
          reprehenderit, aliquid commodi officia eligendi ratione voluptatum
          assumenda, sapiente neque quia dignissimos aut fugit ex corporis
          beatae natus quasi. Corrupti molestias modi nobis, in excepturi odit
          aspernatur! Accusamus fugit debitis deleniti. Nesciunt tenetur odit
          similique ex deleniti reprehenderit repellendus exercitationem fugit.
        </p>
        <button
          className="cursor-pointer self-start rounded-md bg-white px-8 py-2.5 text-sm font-semibold text-gray-900 uppercase hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400"
          onClick={handleSignOutBtn}
        >
          log out
        </button>
      </div>
    </div>
  );
};
