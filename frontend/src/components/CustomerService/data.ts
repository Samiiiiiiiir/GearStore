import React from 'react';

import Exchange from '@assets/icons/exchange.svg?react';
import Shipping from '@assets/icons/shipping.svg?react';
import Warranty from '@assets/icons/warranty.svg?react';

interface ICustomerServiceItem {
  title: string;
  desc: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export const customerServiceItems: ICustomerServiceItem[] = [
  {
    title: 'Free shipping',
    desc: "It's not actually free we just price it into the products. Someone's paying for it, and it's not us",
    Icon: Shipping,
  },
  {
    title: '10-year warranty',
    desc: "If it breaks in the first 10 years we'll replace it. After that you're on your own though",
    Icon: Warranty,
  },
  {
    title: 'Exchanges',
    desc: "If you don't like it, trade it to one of your friends for something of theirs. Don't send it here though",
    Icon: Exchange,
  },
];
