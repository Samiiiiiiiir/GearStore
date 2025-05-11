import { Header } from './../../components/Header';
import { Container } from './../../components/Container';
import { Footer } from './../../components/Footer';
import { Outlet, ScrollRestoration } from 'react-router';
import { Toaster } from 'react-hot-toast';

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
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};
