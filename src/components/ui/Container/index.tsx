import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export const Container = ({ children, className }: ContainerProps) => {
  const classes = twMerge(
    'mx-auto max-w-[1300px] w-full px-4 xl:px-1 h-full',
    className,
  );

  return <div className={classes}>{children}</div>;
};
