export interface ProductItem {
  _id: number;
  _base: string;
  brand: string;
  category: string;
  colors: string[];
  description: string;
  discountedPrice: number;
  images: string[];
  isNew: boolean;
  isStock: boolean;
  name: string;
  overView: string;
  quantity: number;
  rating: number;
  regularPrice: number;
  reviews: number;
}
