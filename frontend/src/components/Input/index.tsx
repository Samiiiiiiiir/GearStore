import { InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = ({ className, ...props }: InputProps) => {
  const classes = twMerge(
    'bg-white/5 block w-full px-2 py-2 rounded-md border-1 border-gray-800 focus:border-white duration-100 outline-0',
    className,
  );
  return <input className={classes} {...props} />;
};
