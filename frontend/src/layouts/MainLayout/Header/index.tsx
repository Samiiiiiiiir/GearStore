import { FaChevronDown } from 'react-icons/fa';
import { Link } from 'react-router';

import { SearchBar } from '@components/shared/SearchBar/index.tsx';
import { Container } from '@components/ui/Container/index.tsx';
import { UserActions } from '@components/ui/UserActions/index.tsx';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ROUTES } from '@router/routes';
import { useGetCategoriesQuery } from '@services/api/publicApiSlice';

import { HeaderNavigation } from './HeaderNavigation.tsx';

export const Header = () => {
  const { data, isSuccess, isError } = useGetCategoriesQuery();

  return (
    <header className="sticky top-0 z-49 bg-white shadow-lg">
      <Container className="flex h-20 items-center justify-between gap-1 py-0 sm:gap-12">
        <h1 className="text-[26px] font-bold whitespace-nowrap sm:text-3xl">
          <Link to={ROUTES.main}>Gear-shop</Link>
        </h1>
        <SearchBar />
        <UserActions />
      </Container>
      <div className="bg-dark">
        <Container className="flex items-center justify-end gap-16 py-3.5 text-white sm:justify-between lg:justify-evenly">
          <Menu>
            <MenuButton className="hidden cursor-pointer items-center gap-2 rounded-md border border-gray-300 p-1.5 text-gray-300 duration-200 hover:border-white hover:text-white sm:inline-flex">
              <span>Select Category</span>
              <FaChevronDown size={15} />
            </MenuButton>
            <MenuItems
              anchor="bottom start"
              transition
              className="z-49 grid origin-top-left gap-1.5 rounded-lg border-none bg-black p-1 text-sm text-gray-300 transition duration-200 ease-out outline-none data-closed:scale-95 data-closed:opacity-0"
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
                data.map((item) => (
                  <MenuItem key={item._id}>
                    <Link
                      to={`${ROUTES.products}?active=${item._base}`}
                      className="data-focus:text-blue flex items-center gap-2 rounded-md px-3.5 py-1 duration-200 data-focus:bg-white/20"
                    >
                      <div className="flex items-center justify-center rounded-full bg-white p-1">
                        <img
                          loading="lazy"
                          src={item.image}
                          alt={item._base}
                          width={24}
                          height={24}
                          className="h-6 w-6 rounded-md object-contain"
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
