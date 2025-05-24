import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Outlet, ScrollRestoration } from 'react-router';

import { Container } from '@components/ui/Container';
import { getUserInfo } from '@services/state/slices/userSlice';
import { useAppDispatch } from '@services/state/store';
import { auth } from '@utils';

import { Footer } from './Footer';
import { Header } from './Header';

export const MainLayout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser?.uid) {
        dispatch(getUserInfo(firebaseUser.uid));
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex h-full flex-1 flex-col">
        <Container className="flex-1 py-4 lg:py-8">
          <ScrollRestoration />
          <Outlet />
        </Container>
      </main>
      <Footer />
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
};
