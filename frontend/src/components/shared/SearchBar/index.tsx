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
    if (isSuccess) {
      const filtered = data.items.filter((item) =>
        item.name.toLowerCase().includes(searchValue.trim().toLowerCase()),
      );

      setFilteredData(filtered);
    }
  }, [searchValue]);

  return (
    <>
      <div className="hidden sm:inline-flex items-center max-w-3xl w-full relative">
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          type="text"
          placeholder="Search products..."
          className="w-full pl-5 pr-12 py-[10px] rounded-full shadow-sm ring-1 ring-gray-400 ring-inset focus:ring-dark placeholder:text-base placeholder:tracking-wide"
        />
        {searchValue ? (
          <IoClose
            onClick={() => setSearchValue('')}
            size={24}
            className="absolute right-4 cursor-pointer hover:text-red-400 duration-200"
          />
        ) : (
          <CiSearch size={24} className="absolute right-4" />
        )}
      </div>

      {searchValue && (
        <div className="hidden sm:block absolute bg-white left-0 h-[60vh] overflow-y-scroll no-scrollbar z-50 w-full top-20 shadow-lg shadow-gray-400 p-3">
          {filteredData.length > 0 ? (
            <ul className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {filteredData.map((item) => (
                <li key={item._id}>
                  <ProductCard item={item} onClick={() => setSearchValue('')} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-xl py-8 flex items-center h-full justify-center px-4 text-center">
              <p>
                Nothing matches with your search keywords{' '}
                <span className="underline underline-offset-2 decoration-[1px] text-gray-500 font-semibold">{`(${searchValue})`}</span>
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};
