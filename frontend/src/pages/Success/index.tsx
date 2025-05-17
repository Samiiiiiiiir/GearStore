import { arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaArrowLeft } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router';

import { LinkButton } from '@components/LinkButton';
import { PageLoader } from '@components/PageLoader';
import { db } from '@lib/firebase';
import { ROUTES } from '@router/AppRouter';
import { useAppDispatch, useAppSelector } from '@store';
import { clearCart } from '@store/slices/cartSlice';

export const Success = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const { user, cart, list } = useAppSelector((state) => ({
    user: state.userSlice.user,
    cart: state.cartSlice.cart,
    list: state.wishlistSlice.list,
  }));

  const location = useLocation();
  const navigate = useNavigate();

  const { session_id: sessionId } = queryString.parse(location.search);

  useEffect(() => {
    if (!sessionId) {
      navigate('/');
    }

    const saveOrder = async () => {
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
                orderedItems: cart,
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
                  orderedItems: cart,
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
      <div className="flex flex-col items-center justify-center gap-y-5 h-full">
        <h2 className="text-2xl lg:text-4xl font-bold text-center">
          {loading
            ? 'Order payment is processing...'
            : 'Your payment accepted!'}
        </h2>
        <p className="">Now you can view your orders or continue shopping!</p>
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
