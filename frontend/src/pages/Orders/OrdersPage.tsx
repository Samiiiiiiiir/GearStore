import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router';

import { LinkButton } from '@components/ui/LinkButton';
import { Title } from '@components/ui/Title';
import { ROUTES } from '@router/routes';
import { useAppSelector } from '@services/state/store';
import { IOrderItem } from '@types';
import { db } from '@utils';

import { OrderItem } from './OrderItem';

const Orders = () => {
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
                      <span className="text-xl font-semibold">
                        {user.firstname} {user.lastname}
                      </span>
                    </p>
                    <p className="text-lg">
                      Total orders:
                      <span className="text-xl font-semibold">
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
                <div className="flex justify-center">
                  <div className="flex w-2xl flex-col gap-4 text-center">
                    <Title>You don't have any orders yet</Title>
                    <p className="text-lg text-gray-600">
                      Ready to find something you love? Explore our latest
                      products and get started!
                    </p>
                    <LinkButton to={ROUTES.products} className="self-center">
                      <FaArrowLeft />
                      <span>Start Shopping</span>
                    </LinkButton>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        <div className="my-8 text-center">
          <Title className="mb-2">
            To view your orders, please{' '}
            <Link
              to={ROUTES.profile}
              className="text-blue/80 hover:text-blue underline transition-colors"
            >
              sign in
            </Link>
          </Title>
          <p className="text-gray-500">
            You need to be logged in to view your previous orders and track
            shipping
          </p>
        </div>
      )}
    </>
  );
};

export default Orders;
