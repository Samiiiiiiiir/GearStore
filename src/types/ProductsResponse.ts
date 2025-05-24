import { ProductItem } from './ProductItem';

export interface ProductsResponse {
  page: number;
  limit: number;
  total: number;
  items: ProductItem[];
}
