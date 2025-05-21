import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { twMerge } from 'tailwind-merge';

import { useGetCategoriesQuery } from '@services/api/publicApiSlice';

interface CategoriesFilterProps {
  active?: string | (string | null)[] | null;
}

export const CategoriesFilter = ({ active }: CategoriesFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { data, isSuccess } = useGetCategoriesQuery();

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  return (
    <div className="inline-flex flex-col gap-1 sm:p-2">
      <button
        onClick={() => setIsOpen(true)}
        className="bg-dark/85 text-white py-3 px-10 self-center rounded-full text-center cursor-pointer block shadow-md whitespace-nowrap sm:hidden"
      >
        Categories
      </button>
      <h3 className="hidden sm:block text-lg mb-1 font-semibold uppercase whitespace-nowrap">
        select categories
      </h3>

      {isOpen && (
        <div
          className="fixed bg-dark/40 h-screen w-screen top-0 left-0 z-50 cursor-pointer sm:hidden "
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={twMerge(
          'flex flex-col justify-between max-sm:z-50 bg-white max-sm:top-0 max-sm:fixed max-sm:h-screen max-sm:w-[max(66%,250px)] max-sm:text-center max-sm:gap-5 max-sm:py-7',
          isOpen ? 'max-sm:left-0' : 'max-sm:-left-full',
        )}
      >
        <div className="flex flex-col text-xl sm:text-lg gap-3 sm:gap-1 overflow-y-auto">
          {isSuccess &&
            data.map((item) => (
              <Link
                key={item._id}
                to={`?active=${item._base}`}
                onClick={() => setIsOpen(false)}
                className={`font-medium underline underline-offset-2 decoration-1 decoration-transparent hover:decoration-gray-950 hover:text-black duration-200 ${
                  item._base == active
                    ? 'text-blue decoration-blue'
                    : 'text-light'
                }`}
                aria-current={item._base === active ? 'page' : undefined}
              >
                <span className="whitespace-nowrap">{item.name}</span>
              </Link>
            ))}
        </div>
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="self-center px-14 text-white rounded-full text-center py-3 bg-dark/85 cursor-pointer shadow-md sm:hidden "
        >
          Close
        </button>
      </div>
    </div>
  );
};
