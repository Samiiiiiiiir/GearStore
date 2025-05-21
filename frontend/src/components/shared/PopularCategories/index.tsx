import ContentLoader from 'react-content-loader';
import { Link } from 'react-router';

import { Section } from '@components/ui/Section';
import { ROUTES } from '@router/routes';
import { useGetCategoriesQuery } from '@services/api/publicApiSlice';

import { SectionHeader } from './../SectionHeader';

export const PopularCategories = () => {
  const { data, isSuccess, isFetching, isLoading } = useGetCategoriesQuery();

  return (
    <Section>
      <SectionHeader
        title="Popular categories"
        linkText="View All Categories"
        linkPath={ROUTES.products}
      />
      <ul className="grid grid-cols-2 gap-4 pt-8 sm:grid-cols-3 sm:gap-6 md:grid-cols-4 lg:grid-cols-6">
        {(isLoading || isFetching) &&
          new Array(12).fill(null).map((_, i) => (
            <li key={i}>
              <ContentLoader
                speed={2}
                className="aspect-square h-auto w-full overflow-hidden rounded-md"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
              >
                <rect x="0" y="0" rx="0" ry="0" width="100%" height="100%" />
              </ContentLoader>
            </li>
          ))}
        {isSuccess &&
          data.map((item) => (
            <li
              key={item._id}
              className="group relative overflow-hidden rounded-md"
            >
              <Link to={`${ROUTES.products}?active=${item._base}`}>
                <img
                  loading="lazy"
                  src={item.image}
                  alt={item.name}
                  className="h-auto w-full object-cover duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-center font-bold text-white">
                  {item.name}
                </div>
              </Link>
            </li>
          ))}
      </ul>
    </Section>
  );
};
