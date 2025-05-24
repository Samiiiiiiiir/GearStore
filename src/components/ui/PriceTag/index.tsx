import { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

import { formatPrice } from '@utils';

interface PriceTagProps extends HTMLAttributes<HTMLDivElement> {
  regularPrice: number;
  discountedPrice: number;
}

export const PriceTag = ({
  regularPrice,
  discountedPrice,
  className,
  ...props
}: PriceTagProps) => {
  const classes = twMerge('flex gap-3 font-bold', className);

  return (
    <div className={classes} {...props}>
      <span className="text-gray-600 line-through">
        {formatPrice(regularPrice)}
      </span>
      <span className="text-blue">{formatPrice(discountedPrice)}</span>
    </div>
  );
};
