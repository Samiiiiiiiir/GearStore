import { Pagination } from '@components/shared/Pagination';
import { Section } from '@components/ui/Section';
import { ROUTES } from '@router/routes';

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
