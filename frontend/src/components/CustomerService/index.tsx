import React from 'react';

import Warranty from './../../assets/icons/warranty.svg?react';
import Shipping from './../../assets/icons/shipping.svg?react';
import Exchange from './../../assets/icons/exchange.svg?react';

interface ICustomerServiceItem {
  title: string;
  desc: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const customerServiceItems: ICustomerServiceItem[] = [
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

export const CustomerService = () => {
  return (
    <section className="my-6 lg:my-8 p-6 lg:p-16 grid gap-14 rounded-xl bg-[#f6f6f6]">
      <h2 className="text-2xl lg:text-3xl font-bold text-center">
        We built our business on customer service
      </h2>
      <ul className="grid lg:grid-cols-3 gap-6">
        {customerServiceItems.map(({ title, desc, Icon }) => (
          <li
            key={title}
            className="inline-flex items-center gap-4 lg:flex-col lg:text-center"
          >
            <Icon width={50} height={50} className="shrink-0" />
            <div className="grid gap-2">
              <h3 className="text-gray-900 font-medium text-lg">{title}</h3>
              <p className="text-gray-500 text-sm lg:text-base">{desc}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
