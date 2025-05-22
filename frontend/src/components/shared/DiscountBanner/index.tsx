import { Link } from 'react-router';

import { discountImgOne, discountImgTwo } from '@assets/index';
import { LinkButton } from '@components/ui/LinkButton';
import { Section } from '@components/ui/Section';
import { Title } from '@components/ui/Title';
import { ROUTES } from '@router/routes';

import { SectionHeader } from './../SectionHeader';
import { searchItems } from './data';

export const DiscountBanner = () => {
  return (
    <Section className="grid gap-8">
      <SectionHeader
        linkPath={ROUTES.products}
        linkText="View All"
        title="Popular Search"
      />
      <ul className="xs:gap-4 flex flex-wrap gap-2">
        {searchItems.map(({ link, title }) => (
          <li key={title}>
            <LinkButton
              to={`${ROUTES.products}?active=${link}`}
              className="xs:text-base border-1 border-gray-300 bg-transparent text-sm text-black hover:text-white"
            >
              {title}
            </LinkButton>
          </li>
        ))}
      </ul>
      <div className="relative z-0 overflow-hidden rounded-lg bg-[#f4f4f4]">
        <img
          loading="lazy"
          src={discountImgOne}
          alt=""
          className="absolute top-0 -z-1 hidden md:block"
        />
        <div className="xs:flex-row mb-2 flex flex-col items-center justify-center gap-x-1 gap-y-3 pt-8 lg:gap-3">
          <Title>Sony Headphone</Title>
          <Link
            to={ROUTES.products}
            className="border-red text-red hover:bg-red relative z-2 rounded-full border-1 px-3 py-1 text-lg font-semibold duration-200 hover:text-white lg:px-5 lg:py-3 lg:text-2xl"
          >
            Discount 20%
          </Link>
        </div>
        <div className="pb-8 text-center text-sm font-semibold text-gray-600">
          You’re out to play or stepping out to make
        </div>
        <img
          src={discountImgTwo}
          alt=""
          loading="lazy"
          className="absolute right-0 bottom-0 -z-1 hidden md:block"
        />
      </div>
    </Section>
  );
};
