import queryString from 'query-string';
import { useLocation } from 'react-router';

import { useGetProductsByCategoryQuery } from '@api/publicApiSlice';
import { CategoriesFilter } from '@components/CategoriesFilter';
import { PageLoader } from '@components/PageLoader';
import { ProductCard } from '@components/ProductCard';
import { Title } from '@components/Title';

export const Products = () => {
  const { search } = useLocation();
  const parsed = queryString.parse(search);
  const active = parsed?.active as string | undefined;

  const { data, isSuccess, isLoading, isFetching } =
    useGetProductsByCategoryQuery(active);

  return (
    <>
      <Title className="mb-5 lg:mb-8">Products Collection</Title>
      {(isLoading || isFetching) && <PageLoader />}

      {isSuccess && (
        <div className="flex justify-between gap-5">
          <CategoriesFilter active={parsed?.active} />
          <ul className="grid xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {data?.map((item) => (
              <li key={item._id}>
                <ProductCard item={item} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
