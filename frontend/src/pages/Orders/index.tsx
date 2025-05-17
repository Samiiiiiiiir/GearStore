import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { db } from '@lib/firebase';
import { useAppSelector } from '@store';

export const Orders = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  const { user } = useAppSelector((state) => state.userSlice);

  useEffect(() => {
    const getOrders = async () => {
      if (user) {
        try {
          setLoading(true);

          const docRef = doc(db, 'orders', user?.email);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data().orders;

            console.log(data);

            setOrders(data);
          }
        } catch (e) {
          console.error('Orders fetching error', e);
        } finally {
          setLoading(false);
        }
      }
    };
    getOrders();
  }, []);

  return <div>Orders</div>;
};
