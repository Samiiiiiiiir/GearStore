import { HTMLAttributes } from 'react';

import { formatPrice } from '@utils';

interface FormattedPriceProps extends HTMLAttributes<HTMLSpanElement> {
  price: number;
}

export const FormattedPrice = ({ price, ...props }: FormattedPriceProps) => {
  return <span {...props}>{formatPrice(price)}</span>;
};
