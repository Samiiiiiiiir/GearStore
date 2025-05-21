import { payment } from '@assets/index';
import { Container } from '@components/ui/Container';

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer>
      <Container className="flex flex-col items-start gap-3 py-6 md:flex-row md:items-center md:justify-between">
        <p>@{year} E-commerce solutions. All rights reserved</p>
        <img
          loading="lazy"
          className="object-cover"
          src={payment}
          alt="payment"
        />
      </Container>
    </footer>
  );
};
