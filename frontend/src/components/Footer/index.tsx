import { Container } from './../../components/Container';

import { payment } from '../../assets';

export const Footer = () => {
  return (
    <footer>
      <Container className="py-6 flex md:justify-between flex-col md:flex-row items-start md:items-center gap-3">
        <p>@2024 E-commerce solutions. All rights reserved</p>
        <img className="object-cover" src={payment} alt="payment" />
      </Container>
    </footer>
  );
};
