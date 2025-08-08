import queryString from 'query-string';
import { useLocation } from 'react-router';

import { CategoriesFilter } from '@components/shared/CategoriesFilter';
import { ProductCard } from '@components/shared/ProductCard';
import { PageLoader } from '@components/ui/PageLoader';
import { Title } from '@components/ui/Title';
import { useGetProductsByCategoryQuery } from '@services/api/publicApiSlice';

const Products = () => {
  const { search } = useLocation();
  const parsed = queryString.parse(search);
  const active = parsed?.active as string | undefined;

  const { data, isSuccess, isLoading, isFetching, isError } =
    useGetProductsByCategoryQuery(active);

  console.log('error', isError);

  return (
    <>
      <Title className="mb-1.5 sm:mb-5 lg:mb-8">Products Collection</Title>
      {(isLoading || isFetching) && <PageLoader />}
      {isError && (
        <div className="text-red font-medium">Something went wrong</div>
      )}
      {isSuccess && (
        <div className="flex flex-col items-start justify-between gap-5 sm:flex-row">
          <CategoriesFilter active={parsed?.active} />
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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

export default Products;
