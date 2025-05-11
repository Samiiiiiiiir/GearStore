import { Title } from '../Title';
import { Link } from 'react-router';

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
    <div className="flex gap-x-4 gap-y-1 flex-wrap justify-between items-center pb-3 border-b-1 border-b-gray-300">
      <Title>{title}</Title>
      <div className="relative group overflow-hidden">
        <Link to={linkPath} className="font-semibold">
          {linkText}
        </Link>
        <span className="absolute bottom-0 w-0 left-0 border-b-1 group-hover:w-full duration-200" />
      </div>
    </div>
  );
};
