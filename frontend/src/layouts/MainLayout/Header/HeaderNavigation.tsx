import { NavLink } from 'react-router';

import { headerNavigationData } from './data';

export const HeaderNavigation = () => {
  return (
    <nav>
      <ul className="inline-flex gap-x-4 sm:gap-x-6 gap-y-2 lg:gap-x-8 items-center">
        {headerNavigationData.map(({ title, path }) => (
          <li key={title}>
            <NavLink
              className={({ isActive }) =>
                `${isActive ? 'text-white' : 'text-white/75 hover:text-white'} group text-sm inline-flex items-center py-1 duration-200 relative overflow-hidden whitespace-nowrap`
              }
              to={path}
            >
              {({ isActive }) => (
                <>
                  <span className="uppercase">{title}</span>
                  <span
                    className={`absolute bottom-0 border-b-1 bg-white ${
                      isActive
                        ? 'w-full'
                        : 'w-0 group-hover:w-full duration-200'
                    }`}
                  />
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
