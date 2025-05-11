import { ReactNode } from 'react';
import { Link, LinkProps } from 'react-router';
import { twMerge } from 'tailwind-merge';

interface LinkButtonProps extends LinkProps {
  children: ReactNode;
}

export const LinkButton = ({
  children,
  className,
  ...props
}: LinkButtonProps) => {
  const classes = twMerge(
    'bg-dark/85 hover:bg-dark duration-200 text-white py-3.5 px-6 rounded-full cursor-pointer flex items-center gap-2 shadow-md whitespace-nowrap',
    className
  );

  return (
    <Link className={classes} {...props}>
      {children}
    </Link>
  );
};
