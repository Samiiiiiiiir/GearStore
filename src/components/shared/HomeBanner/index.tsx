import { FaArrowLeft } from 'react-icons/fa';

import { airpodsMax } from '@assets/index';
import { LinkButton } from '@components/ui/LinkButton';
import { Section } from '@components/ui/Section';
import { ROUTES } from '@router/routes';

export const HomeBanner = () => {
  return (
    <Section className="relative">
      <img
        src={airpodsMax}
        alt=""
        className="relative -z-1 h-full min-h-80 w-full rounded-lg object-cover object-center filter-[grayscale(20%)] select-none"
        draggable="false"
      />
      <div className="absolute top-[50%] z-2 grid translate-y-[-50%] gap-5 px-8 xl:gap-8">
        <h2 className="text-4xl font-bold text-white text-shadow-lg xl:text-7xl">
          AirPods Max
        </h2>
        <p className="text-base font-semibold text-white/95 sm:block md:text-lg xl:max-w-[360px] xl:text-xl">
          The premium sound experience you’ve been dreaming of is right here
        </p>
        <LinkButton
          to={ROUTES.products}
          className="justify-self-start bg-white px-4 py-2.5 text-black duration-300 hover:bg-gray-200 xl:px-6 xl:py-3.5"
        >
          <FaArrowLeft />
          <span>Start Shopping</span>
        </LinkButton>
      </div>
    </Section>
  );
};
