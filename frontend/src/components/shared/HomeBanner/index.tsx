import { FaArrowLeft } from 'react-icons/fa';

import { homeBanner } from '@assets/index';
import { LinkButton } from '@components/ui/LinkButton';
import { Section } from '@components/ui/Section';
import { ROUTES } from '@router/routes';

export const HomeBanner = () => {
  return (
    <Section className="relative">
      <img
        loading="lazy"
        src={homeBanner}
        alt=""
        className="relative -z-1 h-full w-full rounded-lg object-cover filter-[grayscale(20%)] select-none"
        draggable="false"
      />
      <div className="absolute top-[50%] z-2 grid translate-y-[-50%] gap-5 px-8 xl:gap-8">
        <h2 className="text-3xl font-bold text-white md:text-4xl xl:text-7xl">
          Mi Air Purifier
        </h2>
        <p className="hidden text-base font-semibold text-white/90 sm:block md:text-lg xl:max-w-[300px] xl:text-xl">
          The new tech gift you are wishing for right here
        </p>
        <LinkButton
          to={ROUTES.products}
          className="justify-self-start bg-white px-4 py-2.5 text-sm text-black duration-300 hover:bg-black hover:text-white sm:text-base xl:px-6 xl:py-3.5"
        >
          <FaArrowLeft />
          <span>Start Shopping</span>
        </LinkButton>
      </div>
    </Section>
  );
};
