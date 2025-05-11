import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  CategoryItem,
  ProductsResponse,
  HighlightItem,
  ProductItem,
  CartItem,
} from '../types';

import axios, { AxiosError } from 'axios';

const baseUrl: string = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const publicApiSlice = createApi({
  reducerPath: 'publicApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (build) => ({
    getCategories: build.query<CategoryItem[], void>({
      query: () => ({ url: '/categories' }),
    }),
    getHighlights: build.query<HighlightItem[], void>({
      query: () => ({ url: '/highlights' }),
    }),
    getProducts: build.query<
      ProductsResponse,
      { page: number; limit: number } | void
    >({
      query: (params) => ({
        url:
          params?.page && params?.limit
            ? `/products?page=${params.page}&limit=${params.limit}`
            : '/products',
      }),
    }),
    getProductsByCategory: build.query<ProductItem[], string | void>({
      query: (active) => ({
        url: `/categories/${active}`,
      }),
    }),
    getOneProduct: build.query<ProductItem, string>({
      query: (id) => ({
        url: `/products/${id}`,
      }),
    }),
    getCartProducts: build.query<ProductItem[], CartItem[]>({
      queryFn: async (items) => {
        try {
          const response = await Promise.all(
            items.map((item) => axios.get(`${baseUrl}/products/${item.id}`))
          );

          const data: ProductItem[] = response.map((item) => item.data);

          return { data };
        } catch (error: unknown) {
          const err = error as AxiosError;
          return {
            error: {
              status: err.response?.status || 500,
              data: err.message,
            },
          };
        }
      },
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetHighlightsQuery,
  useGetProductsQuery,
  useGetProductsByCategoryQuery,
  useGetOneProductQuery,
  useGetCartProductsQuery,
} = publicApiSlice;
