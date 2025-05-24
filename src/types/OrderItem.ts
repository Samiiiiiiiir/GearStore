import { ProductItem } from './ProductItem';

export interface IOrderItem {
  paymentMethod: string;
  orderedItems: ProductItem[];
  paymentId: string;
  userEmail: string;
  userId: string;
}
