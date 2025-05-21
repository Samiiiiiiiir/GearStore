import { Brands } from '@components/shared/Brands';
import { CustomerService } from '@components/shared/CustomerService';
import { DiscountBanner } from '@components/shared/DiscountBanner';
import { Highlights } from '@components/shared/Highlights';
import { HomeBanner } from '@components/shared/HomeBanner';
import { PopularCategories } from '@components/shared/PopularCategories';
import { TopProducts } from '@components/shared/TopProducts';

const Home = () => {
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

export default Home;
