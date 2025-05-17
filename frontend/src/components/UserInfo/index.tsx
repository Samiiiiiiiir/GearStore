import toast from 'react-hot-toast';

import { auth } from '@lib/firebase';
import { useAppDispatch } from '@store';
import { resetUser } from '@store/slices/userSlice';
import { IUserData } from '@types';

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
    <div className="text-white bg-gray-900 px-6 py-12 sm:py-18 xl:py-24 shadow-2xl rounded-md sm:rounded-3xl sm:px-16">
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold tracking-tight sm:text-4xl">
          Welcome back,{' '}
          <span className="underline underline-offset-4 decoration-1">
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
          className="self-start uppercase cursor-pointer rounded-md bg-white px-8 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400"
          onClick={handleSignOutBtn}
        >
          log out
        </button>
      </div>
    </div>
  );
};
