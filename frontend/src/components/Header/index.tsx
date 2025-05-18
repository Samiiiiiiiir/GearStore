import { FaChevronDown } from 'react-icons/fa';
import { Link } from 'react-router';

import { useGetCategoriesQuery } from '@api/publicApiSlice.ts';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ROUTES } from '@lib/constants';

import { Container } from './../Container';
import { SearchBar } from './../SearchBar';
import { UserActions } from './../UserActions';
import { HeaderNavigation } from './HeaderNavigation.tsx';

export const Header = () => {
  const { data: categoriesData, isSuccess, isError } = useGetCategoriesQuery();

  return (
    <header className="sticky top-0 z-49 bg-white">
      <Container className="items-center justify-between py-0 flex h-20 gap-4 sm:gap-12">
        <h1>
          <Link
            to={ROUTES.main}
            className="text-3xl font-bold whitespace-nowrap"
          >
            Gear-shop
          </Link>
        </h1>
        <SearchBar />
        <UserActions />
      </Container>
      <div className="bg-dark">
        <Container className="py-3 text-white flex items-center md:justify-evenly gap-16 ">
          <Menu>
            <MenuButton className="inline-flex items-center gap-2 cursor-pointer border text-gray-300 hover:text-white duration-200 p-1.5 rounded-md border-gray-300 hover:border-white ">
              <span>Select Category</span>
              <FaChevronDown size={15} />
            </MenuButton>
            <MenuItems
              anchor="bottom start"
              transition
              className="grid gap-1.5 p-1 text-sm text-gray-300 bg-black origin-top-left transition duration-200 ease-out data-closed:scale-95 data-closed:opacity-0 border-none rounded-lg outline-none z-50"
            >
              {isError && (
                <MenuItem>
                  <span className="text-red p-3">
                    Unable to load categories
                    <br /> Please try again later
                  </span>
                </MenuItem>
              )}
              {isSuccess &&
                categoriesData.map((item) => (
                  <MenuItem key={item._id}>
                    <Link
                      to={`${ROUTES.products}?active=${item._base}`}
                      className="data-focus:text-blue data-focus:bg-white/20 duration-200 flex items-center gap-2 py-1 px-3.5 rounded-md"
                    >
                      <div className="bg-white p-1 rounded-full flex items-center justify-center">
                        <img
                          src={item.image}
                          alt={item._base}
                          width={24}
                          height={24}
                          className="rounded-md object-contain w-6 h-6"
                        />
                      </div>
                      <span>{item.name}</span>
                    </Link>
                  </MenuItem>
                ))}
            </MenuItems>
          </Menu>
          <HeaderNavigation />
        </Container>
      </div>
    </header>
  );
};
