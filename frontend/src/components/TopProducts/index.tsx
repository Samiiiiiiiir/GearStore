import { ROUTES } from '@router/AppRouter';

import { Pagination } from './../Pagination';
import { Section } from './../Section';
import { SectionHeader } from './../SectionHeader';

export const TopProducts = () => {
  return (
    <Section>
      <SectionHeader
        title="Top Sells Products"
        linkText="View All Products"
        linkPath={ROUTES.products}
      />

      <Pagination />
    </Section>
  );
};
