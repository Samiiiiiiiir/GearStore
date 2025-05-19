import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router';

import { LinkButton } from '@components/LinkButton';
import { OrderItem } from '@components/OrderItem';
import { Title } from '@components/Title';
import { ROUTES } from '@constants';
import { db } from '@lib/firebase';
import { useAppSelector } from '@store';
import { IOrderItem } from '@types';

export const Orders = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState<IOrderItem[]>([]);

  const { user } = useAppSelector((state) => state.userSlice);

  useEffect(() => {
    const getOrders = async () => {
      if (user) {
        try {
          setIsLoading(true);

          const docRef = doc(db, 'orders', user.email);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data: IOrderItem[] = docSnap.data().orders;

            setOrders(data);
          }
        } catch (e) {
          console.error('Orders fetching error', e);
        } finally {
          setIsLoading(false);
        }
      }
    };
    getOrders();
  }, []);

  return (
    <>
      {user ? (
        <div>
          {!isLoading && (
            <>
              {orders?.length > 0 ? (
                <>
                  <div className="mb-1 grid gap-0.5">
                    <Title className="mb-1">Order details</Title>
                    <p className="text-lg">
                      Customer:
                      <span className="font-semibold text-xl">
                        {user.firstname} {user.lastname}
                      </span>
                    </p>
                    <p className="text-lg">
                      Total orders:
                      <span className="font-semibold text-xl">
                        {orders.length}
                      </span>
                    </p>
                    <p className="max-w-lg text-gray-500">
                      You can expand each order to see its full details,
                      including tracking information and item breakdown!
                    </p>
                  </div>
                  <ul>
                    {orders.map((item) => (
                      <li key={item.paymentId}>
                        <OrderItem item={item} />
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <div className="flex flex-col gap-3.5">
                  <Title className="text-center">
                    You don't have any orders yet
                  </Title>
                  <LinkButton to={ROUTES.products} className="self-center">
                    <FaArrowLeft />
                    <span>Start Shopping</span>
                  </LinkButton>
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        <Title className="text-center my-8">
          Please{' '}
          <Link
            to={ROUTES.profile}
            className="text-blue/79 hover:text-blue duration-200 underline"
          >
            sign in
          </Link>{' '}
          to see your orders
        </Title>
      )}
    </>
  );
};
