import { Section } from '../Section';
import { Link } from 'react-router';

import { discountImgOne, discountImgTwo } from './../../assets';
import { SectionHeader } from '../SectionHeader';
import { LinkButton } from '../LinkButton';

const searchItems = [
  { title: 'Smart Watches', link: 'smartWatches' },
  { title: 'Headphone', link: 'headphones' },
  { title: 'Cameras', link: 'camerasAndPhotos' },
  { title: 'Audio', link: 'tvAndAudio' },
  { title: 'Laptop & Computers', link: 'computersAndLaptop' },
  { title: 'Cell Phone', link: 'cellPhones' },
];

export const DiscountBanner = () => {
  return (
    <Section className="grid gap-8">
      <SectionHeader
        linkPath="/products"
        linkText="View All"
        title="Popular Search"
      />
      <ul className="flex gap-4 flex-wrap">
        {searchItems.map(({ link, title }) => (
          <li key={title}>
            <LinkButton
              to={`/products?active=${link}`}
              className="bg-transparent text-black hover:text-white border-gray-300 border-1"
            >
              {title}
            </LinkButton>
          </li>
        ))}
      </ul>
      <div className="bg-[#f4f4f4] rounded-lg relative overflow-hidden z-0">
        <img
          src={discountImgOne}
          alt=""
          className="hidden md:block absolute top-0 -z-1"
        />
        <div className="flex justify-center items-center gap-1 lg:gap-3  mb-2 pt-8">
          <h2 className="text-xl lg:text-4xl font-bold">Sony Headphone</h2>
          <Link
            to="/products"
            className="py-1 px-3 lg:py-3 lg:px-5 rounded-full font-semibold text-lg lg:text-2xl border-1 border-red text-red hover:text-white hover:bg-red duration-200 relative z-2"
          >
            Discount 20%
          </Link>
        </div>
        <div className="text-center text-sm font-semibold pb-8 text-gray-600">
          You’re out to play or stepping out to make
        </div>
        <img
          src={discountImgTwo}
          alt=""
          className="hidden md:block absolute right-0 bottom-0 -z-1"
        />
      </div>
    </Section>
  );
};
