import { FaArrowLeft } from 'react-icons/fa';
import { useLocation } from 'react-router';

import { LinkButton } from '@components/LinkButton';
import { ROUTES } from '@constants';

export const NotFound = () => {
  const { pathname } = useLocation();

  return (
    <div className="grid gap-6 my-14">
      <div className="text-3xl lg:text-4xl text-red font-semibold">SORRY</div>
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
