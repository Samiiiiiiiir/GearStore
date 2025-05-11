import { HTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export const Section = ({ children, className, ...props }: SectionProps) => {
  const classes = twMerge('py-6 lg:py-8', className);

  return (
    <section className={classes} {...props}>
      {children}
    </section>
  );
};
