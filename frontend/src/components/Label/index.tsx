import { HTMLInputTypeAttribute, LabelHTMLAttributes, ReactNode } from 'react';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  text: string;
  children: ReactNode;
  inputType?: HTMLInputTypeAttribute;
}

export const Label = ({ children, text, inputType, ...props }: LabelProps) => {
  return (
    <label {...props}>
      <span className="block mb-3">{text}</span>
      {children}
    </label>
  );
};
