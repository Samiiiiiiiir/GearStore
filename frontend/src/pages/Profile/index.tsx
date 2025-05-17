import { AuthForm } from '@components/AuthForm';
import { PageLoader } from '@components/PageLoader';
import { UserInfo } from '@components/UserInfo';
import { useAppSelector } from '@store';

export const Profile = () => {
  const { user, isLoading } = useAppSelector((state) => state.userSlice);

  return (
    <div>
      {isLoading ? (
        <PageLoader />
      ) : user ? (
        <UserInfo user={user} />
      ) : (
        <AuthForm />
      )}
    </div>
  );
};
