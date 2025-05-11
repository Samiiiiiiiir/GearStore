import { Link } from 'react-router';

const headerNavigationData = [
  { title: 'home', path: '/' },
  { title: 'shop', path: '/products' },
  { title: 'cart', path: '/cart' },
  { title: 'orders', path: '/orders' },
  { title: 'my account', path: '/profile' },
];

export const HeaderNavigation = () => {
  return (
    <nav>
      <ul className="hidden md:inline-flex gap-6 lg:gap-10 items-center">
        {headerNavigationData.map(({ title, path }) => (
          <li key={title}>
            <Link
              to={path}
              className="group text-sm inline-flex items-center py-1 text-white/85 hover:text-white duration-200 relative overflow-hidden"
            >
              <span>{title.toUpperCase()}</span>
              <span className="absolute w-0 bottom-0 border-b-1 bg-white group-hover:w-full duration-200" />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
