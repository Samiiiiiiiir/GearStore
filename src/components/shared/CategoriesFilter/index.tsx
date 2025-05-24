import { useState } from 'react';
import { Link } from 'react-router';
import { twMerge } from 'tailwind-merge';

import { useToggleBodyClass } from '@hooks/useToggleBodyClass';
import { useGetCategoriesQuery } from '@services/api/publicApiSlice';

interface CategoriesFilterProps {
  active?: string | (string | null)[] | null;
}

export const CategoriesFilter = ({ active }: CategoriesFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useToggleBodyClass('!overflow-y-hidden', isOpen);

  const { data, isSuccess } = useGetCategoriesQuery();

  return (
    <div className="inline-flex flex-col gap-1 sm:p-2">
      <button
        onClick={() => setIsOpen(true)}
        className="bg-dark/85 block cursor-pointer self-center rounded-full px-10 py-3 text-center whitespace-nowrap text-white shadow-md sm:hidden"
      >
        Categories
      </button>
      <h3 className="mb-1 hidden text-lg font-semibold whitespace-nowrap uppercase sm:block">
        select categories
      </h3>

      {isOpen && (
        <div
          className="bg-dark/40 fixed top-0 left-0 z-50 h-screen w-screen cursor-pointer sm:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={twMerge(
          'flex flex-col justify-between bg-white max-sm:fixed max-sm:top-0 max-sm:z-50 max-sm:h-[100svh] max-sm:w-[max(66%,250px)] max-sm:gap-5 max-sm:py-7 max-sm:text-center',
          isOpen ? 'max-sm:left-0' : 'max-sm:-left-full',
        )}
      >
        <div className="flex flex-col gap-3 overflow-y-auto text-xl sm:gap-1 sm:text-lg">
          {isSuccess &&
            data.map((item) => (
              <Link
                key={item._id}
                to={`?active=${item._base}`}
                onClick={() => setIsOpen(false)}
                className={`font-medium underline decoration-transparent decoration-1 underline-offset-2 duration-200 hover:text-black hover:decoration-gray-950 ${
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
          className="bg-dark/85 cursor-pointer self-center rounded-full px-14 py-3 text-center text-white shadow-md sm:hidden"
        >
          Close
        </button>
      </div>
    </div>
  );
};
