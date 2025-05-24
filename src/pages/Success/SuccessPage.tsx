import { arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaArrowLeft } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router';

import { LinkButton } from '@components/ui/LinkButton';
import { PageLoader } from '@components/ui/PageLoader';
import { ROUTES } from '@router/routes';
import { useLazyGetCartProductsQuery } from '@services/api/publicApiSlice';
import { clearCart } from '@services/state/slices/cartSlice';
import { useAppDispatch, useAppSelector } from '@services/state/store';
import { db } from '@utils';

const Success = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.userSlice);
  const { cart } = useAppSelector((state) => state.cartSlice);

  const [trigger] = useLazyGetCartProductsQuery();

  const location = useLocation();
  const navigate = useNavigate();

  const { session_id: sessionId } = queryString.parse(location.search);

  useEffect(() => {
    if (!sessionId) {
      navigate('/');
      return;
    }

    const saveOrder = async () => {
      const orderedItems = await trigger(cart).unwrap();

      if (user) {
        try {
          setLoading(true);
          const orderRef = doc(db, 'orders', user.email);
          const docSnap = await getDoc(orderRef);

          if (docSnap.exists()) {
            await updateDoc(orderRef, {
              orders: arrayUnion({
                userEmail: user.email,
                paymentId: sessionId,
                orderedItems,
                paymentMethod: 'stripe',
                userId: user.id,
              }),
            });

            toast.success('Order placed successfully');
            dispatch(clearCart());
          } else {
            await setDoc(orderRef, {
              orders: [
                {
                  userEmail: user.email,
                  paymentId: sessionId,
                  orderedItems,
                  paymentMethod: 'stripe',
                },
              ],
            });
          }
        } catch (e) {
          console.error(e);
        } finally {
          setLoading(false);
        }
      }
    };

    saveOrder();
  }, [sessionId]);

  return (
    <div>
      {loading && <PageLoader />}
      <div className="flex h-full flex-col items-center justify-center gap-y-5">
        <h2 className="text-center text-2xl font-bold lg:text-4xl">
          {loading
            ? 'Order payment is processing...'
            : 'Your payment accepted!'}
        </h2>
        <p>Now you can view your orders or continue shopping!</p>
        <div className="flex gap-6">
          <LinkButton to={ROUTES.orders}>
            <FaArrowLeft />
            <span> View orders</span>
          </LinkButton>
          <LinkButton to={ROUTES.products}>
            <FaArrowLeft />
            <span>Continue Shopping</span>
          </LinkButton>
        </div>
      </div>
    </div>
  );
};

export default Success;
