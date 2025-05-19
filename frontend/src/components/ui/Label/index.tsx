import { LabelHTMLAttributes, ReactNode } from 'react';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  text: string;
  children: ReactNode;
}

export const Label = ({ children, text, ...props }: LabelProps) => {
  return (
    <label {...props}>
      <span className="block mb-3">{text}</span>
      {children}
    </label>
  );
};
