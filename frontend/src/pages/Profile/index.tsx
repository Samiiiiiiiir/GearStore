import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';

import { AuthForm } from '@components/AuthForm';
import { PageLoader } from '@components/PageLoader';
import { UserInfo } from '@components/UserInfo';
import { auth } from '@lib/firebase';
import { useAppSelector } from '@store';
import { getUserInfo } from '@store/slices/userSlice';

export const Profile = () => {
  const { user, isLoading } = useAppSelector((state) => state.userSlice);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      getUserInfo(user?.uid);
    });

    return () => {
      unSub();
    };
  });

  return (
    <div>
      {isLoading && <PageLoader />}

      {user && !isLoading ? <UserInfo /> : <AuthForm />}
    </div>
  );
};
