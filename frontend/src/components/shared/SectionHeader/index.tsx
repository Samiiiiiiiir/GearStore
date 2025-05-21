import { Link } from 'react-router';

import { Title } from '@components/ui/Title';

interface SectionHeaderProps {
  title: string;
  linkText: string;
  linkPath: string;
}

export const SectionHeader = ({
  title,
  linkText,
  linkPath,
}: SectionHeaderProps) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b-1 border-b-gray-300 pb-3">
      <Title>{title}</Title>
      <div className="group relative overflow-hidden">
        <Link to={linkPath} className="font-semibold">
          {linkText}
        </Link>
        <span className="absolute bottom-0 left-0 w-0 border-b-1 duration-200 group-hover:w-full" />
      </div>
    </div>
  );
};
