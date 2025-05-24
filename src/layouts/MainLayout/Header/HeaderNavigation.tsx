import { NavLink } from 'react-router';

import { headerNavigationData } from './data';

export const HeaderNavigation = () => {
  return (
    <nav>
      <ul className="xs:gap-x-5 inline-flex items-center gap-x-3.5 gap-y-2 sm:gap-x-6 lg:gap-x-8">
        {headerNavigationData.map(({ title, path }) => (
          <li key={title}>
            <NavLink
              className={({ isActive }) =>
                `${isActive ? 'text-white' : 'text-white/75 hover:text-white'} group relative inline-flex items-center overflow-hidden py-1 text-sm whitespace-nowrap duration-200`
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
                        : 'w-0 duration-200 group-hover:w-full'
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
