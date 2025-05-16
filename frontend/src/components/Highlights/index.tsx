import ContentLoader from 'react-content-loader';

import { useGetHighlightsQuery } from '@api/publicApiSlice';

import { LinkButton } from './../LinkButton';
import { Section } from './../Section';

export const Highlights = () => {
  const { data, isFetching, isSuccess } = useGetHighlightsQuery();

  return (
    <Section>
      <h2 className="sr-only">Highlights</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-between">
        {isFetching &&
          new Array(3).fill(null).map((_, i) => (
            <li key={i}>
              <ContentLoader
                speed={2}
                className="rounded-xl overflow-hidden w-full h-60"
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
              className="relative rounded-lg overflow-hidden h-46 lg:h-60 shadow-md group cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.name}
                className="absolute w-full h-full object-cover -z-1 group-hover:scale-110 duration-300"
              />
              <div className="p-4 grid gap-1 pt-6 lg:pt-12 h-full">
                <div>
                  <h3 className="font-bold text-xl lg:text-2xl mb-3 max-w-[60%]">
                    {item.name}
                  </h3>
                  <span className="font-semibold text-lg lg:text-xl">
                    {item.title}
                  </span>
                </div>
                <LinkButton
                  to={item._base}
                  className="justify-self-start mt-auto py-1 px-3 rounded-lg bg-black/65"
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
