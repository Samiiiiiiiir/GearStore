import { HTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

export const Title = ({ children, className, ...props }: TitleProps) => {
  const classes = twMerge(
    'font-bold text-2xl md:text-3xl lg:text-4xl',
    className
  );

  return (
    <h2 className={classes} {...props}>
      {children}
    </h2>
  );
};
