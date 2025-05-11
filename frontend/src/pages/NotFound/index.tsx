import { useLocation } from 'react-router';
import { FaArrowLeft } from 'react-icons/fa';

import { LinkButton } from './../../components/LinkButton';

export const NotFound = () => {
  const { pathname } = useLocation();

  return (
    <div className="grid gap-6 my-14">
      <div className="text-3xl lg:text-4xl text-red font-semibold">SORRY</div>
      <div className="text-2xl lg:text-3xl">
        we couldn't find{' '}
        <span className="text-red underline">{pathname.slice(1)}</span> page
      </div>
      <div className="text-2xl lg:text-3xl">
        the address is entered incorrectly or the page no longer exists
      </div>
      <LinkButton className="justify-self-start" to="/products">
        <FaArrowLeft />
        <span>Start shopping</span>
      </LinkButton>
    </div>
  );
};
