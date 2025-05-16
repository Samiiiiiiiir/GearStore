import { Toaster } from 'react-hot-toast';
import { Outlet, ScrollRestoration } from 'react-router';

import { Container } from '@components/Container';
import { Footer } from '@components/Footer';
import { Header } from '@components/Header';

export const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex flex-col h-full">
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
