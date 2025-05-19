import { FaChevronDown } from 'react-icons/fa';
import { Link } from 'react-router';

import { FormattedPrice } from '@components/FormattedPrice';
import { ROUTES } from '@constants';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { calculateAmount } from '@helpers';
import { IOrderItem } from '@types';

interface OrderItemProps {
  item: IOrderItem;
}

export const OrderItem = ({ item }: OrderItemProps) => {
  return (
    <Disclosure>
      <DisclosureButton className="pt-1 pb-5 mt-4 text-lg group w-full border-b-1 border-b-gray-300 cursor-pointer">
        <div className="flex items-center justify-between gap-6">
          <div>
            <span className="font-semibold">Tracking number:</span>{' '}
            {item.paymentId}
          </div>
          <FaChevronDown
            size={22}
            className="fill-black group-data-open:rotate-180"
          />
        </div>
      </DisclosureButton>
      <DisclosurePanel className="w-full border-x-1 border-b-1 border-gray-300 p-5 bg-[#f6f6f6]">
        <p className="font-semibold text-lg mb-1.5">
          Your order{' '}
          <span className="text-blue">#{item.paymentId.slice(0, 20)}...</span>{' '}
          has shipped and will be with you soon
        </p>
        <div className="grid gap-1">
          <p>
            Order Items Count:{' '}
            <span className="font-semibold">{item.orderedItems.length}</span>
          </p>
          <p>
            Payment Status:{' '}
            <span className="font-semibold">Payed by {item.paymentMethod}</span>
          </p>
          <p>
            Order amount:{' '}
            <FormattedPrice
              price={calculateAmount(item.orderedItems)}
              className="font-semibold"
            />
          </p>
        </div>
        {item.orderedItems.map((item) => (
          <div
            key={item._id}
            className="flex gap-6 border-y-gray-300 border-b-1 py-6"
          >
            <Link
              to={`${ROUTES.products}/${item._id}`}
              className="shrink-0 h-30 w-30 bg-white p-2"
            >
              <img
                src={item.images[0]}
                alt=""
                className="h-full w-full rounded-md object-scale-down p-2"
              />
            </Link>
            <div className="flex flex-col gap-3">
              <h3 className="font-semibold md:text-lg line-clamp-2">
                {item.name}
              </h3>
              <p className="line-clamp-3 text-sm">{item.description}</p>
              <div className="flex gap-6">
                <div>
                  Quantity:{' '}
                  <span className="font-semibold">{item.quantity}</span>
                </div>
                <div>
                  Price:{' '}
                  <FormattedPrice
                    price={item.discountedPrice}
                    className="font-semibold"
                  />
                </div>
                <div>
                  Subtotal:{' '}
                  <FormattedPrice
                    price={item.discountedPrice * item.quantity}
                    className="font-semibold"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </DisclosurePanel>
    </Disclosure>
  );
};
