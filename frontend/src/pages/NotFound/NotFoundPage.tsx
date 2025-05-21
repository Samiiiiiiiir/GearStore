import { FaArrowLeft } from 'react-icons/fa';
import { useLocation } from 'react-router';

import { LinkButton } from '@components/ui/LinkButton';
import { ROUTES } from '@router/routes';

const NotFound = () => {
  const { pathname } = useLocation();

  return (
    <div className="my-14 grid gap-6">
      <div className="text-red text-3xl font-semibold lg:text-4xl">SORRY</div>
      <div className="text-2xl lg:text-3xl">
        We couldn't find <span className="text-red underline">{pathname}</span>{' '}
        page
      </div>
      <div className="text-2xl lg:text-3xl">
        The address is entered incorrectly or the page no longer exists
      </div>
      <LinkButton className="justify-self-start" to={ROUTES.products}>
        <FaArrowLeft />
        <span>Start shopping</span>
      </LinkButton>
    </div>
  );
};

export default NotFound;
