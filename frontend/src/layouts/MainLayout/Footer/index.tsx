import { payment } from '@assets/index';
import { Container } from '@components/ui/Container';

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer>
      <Container className="py-6 flex md:justify-between flex-col md:flex-row items-start md:items-center gap-3">
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
