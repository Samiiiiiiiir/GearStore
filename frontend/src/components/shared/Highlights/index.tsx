import ContentLoader from 'react-content-loader';
import { Link } from 'react-router';

import { Section } from '@components/ui/Section';
import { useGetHighlightsQuery } from '@services/api/publicApiSlice';

export const Highlights = () => {
  const { data, isFetching, isLoading, isSuccess } = useGetHighlightsQuery();

  return (
    <Section>
      <h2 className="sr-only">Highlights</h2>
      <ul className="xs:flex-row flex flex-col justify-between gap-10">
        {(isFetching || isLoading) &&
          new Array(2).fill(null).map((_, i) => (
            <li key={i}>
              <ContentLoader
                speed={2}
                className="h-126 w-full overflow-hidden rounded-md"
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
              className="relative aspect-square h-60 overflow-hidden rounded-md sm:h-80 lg:h-126"
            >
              <Link to={item._base}>
                <img
                  loading="lazy"
                  src={item.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </Link>
            </li>
          ))}
      </ul>
    </Section>
  );
};
