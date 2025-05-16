import ContentLoader from 'react-content-loader';
import { Link } from 'react-router';

import { useGetCategoriesQuery } from '@api/publicApiSlice';
import { ROUTES } from '@router/AppRouter';

import { Section } from './../Section';
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
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 pt-8">
        {(isLoading || isFetching) &&
          new Array(12).fill(null).map((_, i) => (
            <li key={i}>
              <ContentLoader
                speed={2}
                className="rounded-md overflow-hidden w-full h-auto aspect-square"
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
              className="rounded-md overflow-hidden relative group"
            >
              <Link to={`${ROUTES.products}?active=${item._base}`}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-auto object-cover duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white text-center font-bold p-4">
                  {item.name}
                </div>
              </Link>
            </li>
          ))}
      </ul>
    </Section>
  );
};
