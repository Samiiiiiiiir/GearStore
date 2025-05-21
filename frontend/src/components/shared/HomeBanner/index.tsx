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
        className="relative object-cover -z-1 rounded-lg select-none w-full h-full filter-[grayscale(20%)]"
        draggable="false"
      />
      <div className="absolute z-2 top-[50%] translate-y-[-50%]  px-8 grid gap-5 xl:gap-8">
        <h2 className="text-3xl md:text-4xl xl:text-7xl font-bold text-white">
          Mi Air Purifier
        </h2>
        <p className="hidden sm:block text-base md:text-lg xl:text-xl font-semibold text-white/90 xl:max-w-[300px]">
          The new tech gift you are wishing for right here
        </p>
        <LinkButton
          to={ROUTES.products}
          className="py-2.5 px-4 xl:py-3.5 xl:px-6 text-sm sm:text-base justify-self-start bg-white text-black hover:bg-black hover:text-white duration-300"
        >
          <FaArrowLeft />
          <span>Start Shopping</span>
        </LinkButton>
      </div>
    </Section>
  );
};
