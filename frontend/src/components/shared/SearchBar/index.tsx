import { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { IoClose } from 'react-icons/io5';

import { useGetProductsQuery } from '@services/api/publicApiSlice';
import { ProductItem } from '@types';

import { ProductCard } from '../ProductCard';

export const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('');
  const [filteredData, setFilteredData] = useState<ProductItem[]>([]);

  const { data, isSuccess } = useGetProductsQuery();

  useEffect(() => {
    if (isSuccess && data) {
      const filtered = data.items.filter((item) =>
        item.name.toLowerCase().includes(searchValue.trim().toLowerCase()),
      );

      setFilteredData(filtered);
    }
  }, [searchValue, isSuccess]);

  useEffect(() => {
    document.body.style.overflow = searchValue.length === 0 ? '' : 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, [searchValue]);

  return (
    <>
      <div className="relative inline-flex w-full max-w-3xl items-center">
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          type="text"
          placeholder="Search products..."
          className="focus:ring-dark xs:placeholder:text-base w-full rounded-full py-[10px] pr-12 pl-5 shadow-sm ring-1 ring-gray-400 ring-inset placeholder:text-sm placeholder:tracking-wide"
        />
        {searchValue ? (
          <IoClose
            onClick={() => setSearchValue('')}
            size={24}
            className="absolute right-4 cursor-pointer duration-200 hover:text-red-400"
          />
        ) : (
          <CiSearch size={24} className="absolute right-4" />
        )}
      </div>

      {searchValue && (
        <div className="no-scrollbar absolute top-20 left-0 z-49 h-[60vh] w-full overflow-y-scroll bg-white p-3 shadow-lg shadow-gray-400 sm:block">
          {filteredData.length > 0 ? (
            <ul className="xs:grid-cols-2 grid gap-4 lg:grid-cols-3 xl:grid-cols-5">
              {filteredData.map((item) => (
                <li key={item._id}>
                  <ProductCard item={item} onClick={() => setSearchValue('')} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex h-full items-center justify-center px-4 py-8 text-center text-xl">
              <p>
                Nothing matches with your search keywords{' '}
                <span className="font-semibold text-gray-500 underline decoration-[1px] underline-offset-2">{`(${searchValue})`}</span>
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};
