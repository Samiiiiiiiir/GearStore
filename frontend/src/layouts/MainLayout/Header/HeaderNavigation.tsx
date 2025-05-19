import { NavLink } from 'react-router';

import { headerNavigationData } from './data';

export const HeaderNavigation = () => {
  return (
    <nav>
      <ul className="hidden sm:inline-flex gap-6 lg:gap-10 items-center">
        {headerNavigationData.map(({ title, path }) => (
          <li key={title}>
            <NavLink
              className={({ isActive }) =>
                `${isActive ? 'text-white' : 'text-white/75 hover:text-white'} group text-sm inline-flex items-center py-1 duration-200 relative overflow-hidden`
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
