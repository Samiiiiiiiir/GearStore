import { FaChevronDown } from 'react-icons/fa';
import { Link } from 'react-router';

import { FormattedPrice } from '@components/ui/FormattedPrice';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { ROUTES } from '@router/routes';
import { IOrderItem } from '@types';
import { calculateAmount } from '@utils';

interface OrderItemProps {
  item: IOrderItem;
}

export const OrderItem = ({ item }: OrderItemProps) => {
  return (
    <Disclosure>
      <DisclosureButton className="group mt-4 w-full cursor-pointer border-b-1 border-b-gray-300 pt-1 pb-5 text-lg">
        <div className="flex flex-row items-center justify-between gap-x-6 gap-y-2">
          <div>
            <span className="font-semibold">Tracking number: </span>
            <span className="break-all">{item.paymentId}</span>
          </div>
          <FaChevronDown
            size={22}
            className="shrink-0 fill-black group-data-open:rotate-180"
          />
        </div>
      </DisclosureButton>
      <DisclosurePanel className="w-full border-x-1 border-b-1 border-gray-300 bg-[#f6f6f6] p-5">
        <p className="mb-1.5 text-lg font-semibold">
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
            className="xs:flex-row flex flex-col gap-6 border-b-1 border-y-gray-300 py-6"
          >
            <Link
              to={`${ROUTES.products}/${item._id}`}
              className="h-30 w-30 shrink-0 rounded-sm bg-white p-2"
            >
              <img
                loading="lazy"
                src={item.images[0]}
                alt=""
                className="h-full w-full object-scale-down p-2"
              />
            </Link>
            <div className="flex flex-col gap-3">
              <h3 className="line-clamp-2 font-semibold md:text-lg">
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
