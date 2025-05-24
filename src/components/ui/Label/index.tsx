import { LabelHTMLAttributes, ReactNode } from 'react';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  text: string;
  children: ReactNode;
}

export const Label = ({ children, text, ...props }: LabelProps) => {
  return (
    <label {...props}>
      <span className="mb-3 block">{text}</span>
      {children}
    </label>
  );
};
