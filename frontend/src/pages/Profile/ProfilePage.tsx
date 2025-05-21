import { PageLoader } from '@components/ui/PageLoader';
import { useAppSelector } from '@services/state/store';

import { AuthForm } from './components/AuthForm';
import { UserInfo } from './components/UserInfo';

const Profile = () => {
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

export default Profile;
