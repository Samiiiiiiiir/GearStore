import { Section } from '@components/ui/Section/index.tsx';
import { Title } from '@components/ui/Title/index.tsx';

import { brandsData } from './data.ts';

export const Brands = () => {
  return (
    <Section>
      <Title className="mb-6 lg:mb-8">Brands We Distribute</Title>
      <div className="overflow-x-scroll no-scrollbar">
        <ul className="grid grid-cols-5 px-1 min-w-max">
          {brandsData.map(({ source, title }) => (
            <li
              key={title}
              className={`py-1 grid items-center justify-center w-50 lg:w-64 border-y-1 not-first:border-l-1 border-gray-400 `}
            >
              <img
                src={source}
                alt={title}
                title={title}
                className="w-39 lg:w-50 object-scale-down"
              />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
};
