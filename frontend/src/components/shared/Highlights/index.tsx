import ContentLoader from 'react-content-loader';

import { LinkButton } from '@components/ui/LinkButton';
import { Section } from '@components/ui/Section';
import { useGetHighlightsQuery } from '@services/api/publicApiSlice';

export const Highlights = () => {
  const { data, isFetching, isLoading, isSuccess } = useGetHighlightsQuery();

  return (
    <Section>
      <h2 className="sr-only">Highlights</h2>
      <ul className="grid grid-cols-1 justify-between gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {(isFetching || isLoading) &&
          new Array(3).fill(null).map((_, i) => (
            <li key={i}>
              <ContentLoader
                speed={2}
                className="h-60 w-full overflow-hidden rounded-xl"
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
              className="group relative h-46 cursor-pointer overflow-hidden rounded-lg shadow-md lg:h-60"
            >
              <img
                loading="lazy"
                src={item.image}
                alt={item.name}
                className="absolute -z-1 h-full w-full object-cover duration-300 group-hover:scale-110"
              />
              <div className="grid h-full gap-1 p-4 pt-6 lg:pt-12">
                <div>
                  <h3 className="mb-3 max-w-[60%] text-xl font-bold lg:text-2xl">
                    {item.name}
                  </h3>
                  <span className="text-lg font-semibold lg:text-xl">
                    {item.title}
                  </span>
                </div>
                <LinkButton
                  to={item._base}
                  className="mt-auto justify-self-start rounded-lg bg-black/65 px-3 py-1"
                >
                  {item.buttonTitle}
                </LinkButton>
              </div>
            </li>
          ))}
      </ul>
    </Section>
  );
};
