import { Brands } from '@components/Brands';
import { CustomerService } from '@components/CustomerService';
import { DiscountBanner } from '@components/DiscountBanner';
import { Highlights } from '@components/Highlights';
import { HomeBanner } from '@components/HomeBanner';
import { PopularCategories } from '@components/PopularCategories';
import { TopProducts } from '@components/TopProducts';

export const Home = () => {
  return (
    <>
      <HomeBanner />
      <Highlights />
      <PopularCategories />
      <TopProducts />
      <DiscountBanner />
      <Brands />
      <CustomerService />
    </>
  );
};
