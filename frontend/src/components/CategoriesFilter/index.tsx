import { Link } from 'react-router';
import { useGetCategoriesQuery } from '../../api/publicApiSlice';

interface CategoriesFilterProps {
  active?: string | (string | null)[] | null;
}

export const CategoriesFilter = ({ active }: CategoriesFilterProps) => {
  const { data, isSuccess } = useGetCategoriesQuery();

  return (
    <div className="hidden md:inline-flex flex-col gap-1 p-2">
      <h2 className="text-lg mb-1 font-semibold uppercase whitespace-nowrap">
        select categories
      </h2>
      {isSuccess &&
        data.map((item) => (
          <Link
            key={item._id}
            to={`?active=${item._base}`}
            className={`text-lg font-medium text-start underline underline-offset-2 decoration-1 decoration-transparent hover:decoration-gray-950 hover:text-black duration-200 ${
              item._base == active ? 'text-blue decoration-blue' : 'text-light'
            }`}
            aria-current={item._base === active ? 'page' : undefined}
          >
            <span className="whitespace-nowrap">{item.name}</span>
          </Link>
        ))}
    </div>
  );
};
