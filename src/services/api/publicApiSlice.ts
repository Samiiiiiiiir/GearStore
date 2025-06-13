import axios, { AxiosError } from 'axios';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CartItem, CategoryItem, ProductItem, ProductsResponse } from '@types';
import { BASE_URL } from '@utils';

export const publicApiSlice = createApi({
  reducerPath: 'publicApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL || 'http://localhost:3000/',
  }),
  endpoints: (build) => ({
    getCategories: build.query<CategoryItem[], void>({
      query: () => ({ url: '/categories' }),
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
            items.map((item) => axios.get(`${BASE_URL}/products/${item.id}`)),
          );

          const data: ProductItem[] = response.map((item) => ({
            ...item.data,
            quantity: items.find((i) => i.id == item.data._id)?.quantity || 1,
          }));

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
  useGetProductsQuery,
  useGetProductsByCategoryQuery,
  useGetOneProductQuery,
  useGetCartProductsQuery,
  useLazyGetCartProductsQuery,
} = publicApiSlice;
