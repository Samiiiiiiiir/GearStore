import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

import { OrderItem } from '@components/OrderItem';
import { Title } from '@components/Title';
import { ROUTES } from '@lib/constants';
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
              <div className="mb-1 grid gap-0.5">
                <Title className="mb-1">Order details</Title>
                <p className="text-lg">
                  Customer:{' '}
                  <span className="font-semibold text-xl">
                    {user.firstname} {user.lastname}
                  </span>
                </p>
                <p className="text-lg">
                  Total orders:{' '}
                  <span className="font-semibold text-xl">
                    {' '}
                    {orders.length}
                  </span>
                </p>
                <p className="max-w-lg text-gray-500">
                  You can expand each order to see its full details, including
                  tracking information and item breakdown!
                </p>
              </div>
              {orders?.length > 0 &&
                orders.map((item) => (
                  <OrderItem key={item.paymentId} item={item} />
                ))}
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
