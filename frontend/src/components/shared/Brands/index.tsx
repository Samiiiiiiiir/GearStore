import { Section } from '@components/ui/Section/index.tsx';
import { Title } from '@components/ui/Title/index.tsx';

import { brandsData } from './data.ts';

export const Brands = () => {
  return (
    <Section>
      <Title className="mb-6 lg:mb-8">Brands We Distribute</Title>
      <div className="no-scrollbar overflow-x-scroll">
        <ul className="grid min-w-max grid-cols-5 px-1">
          {brandsData.map(({ source, title }) => (
            <li
              key={title}
              className={`grid w-50 items-center justify-center border-y-1 border-gray-400 py-1 not-first:border-l-1 lg:w-64`}
            >
              <img
                loading="lazy"
                src={source}
                alt={title}
                title={title}
                className="w-39 object-scale-down lg:w-50"
              />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
};
