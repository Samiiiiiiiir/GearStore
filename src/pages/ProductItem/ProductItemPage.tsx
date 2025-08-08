import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { AddToCartButton } from '@components/ui/AddToCartButton';
import { FormattedPrice } from '@components/ui/FormattedPrice';
import { PageLoader } from '@components/ui/PageLoader';
import { PriceTag } from '@components/ui/PriceTag';
import { Title } from '@components/ui/Title';
import { WishListButton } from '@components/ui/WishlistButton';
import { useGetOneProductQuery } from '@services/api/publicApiSlice';
import { Rating } from '@smastrom/react-rating';

const ProductItem = () => {
  const [activeImage, setActiveImage] = useState(0);

  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isFetching, isSuccess, isError } =
    useGetOneProductQuery(id!);

  useEffect(() => {
    if (isSuccess && !data) {
      navigate('/');
    }
  }, [isSuccess, data]);

  return (
    <>
      {(isLoading || isFetching) && <PageLoader />}
      {isError && (
        <div className="text-red font-medium">Something went wrong</div>
      )}
      {isSuccess && data && (
        <div className="flex flex-col gap-5 md:flex-row">
          <div className="flex flex-col-reverse justify-center gap-10 md:w-[50%] md:flex-row md:justify-start md:gap-5">
            <div className="flex shrink-0 justify-center gap-1 md:flex-col md:justify-start md:pt-0">
              {data.images.map((item, i) => (
                <img
                  key={i}
                  src={item}
                  alt=""
                  loading="lazy"
                  onClick={() => setActiveImage(i)}
                  className={`aspect-square w-14 cursor-pointer rounded-sm border-1 border-gray-500 object-scale-down p-1 duration-300 hover:opacity-100 xl:w-24 ${
                    activeImage == i ? 'opacity-100' : 'opacity-80'
                  }`}
                />
              ))}
            </div>
            <div className="relative min-h-80 grow overflow-hidden">
              <img
                src={data.images[activeImage]}
                alt={data.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-scale-down"
              />
            </div>
          </div>
          <div className="flex flex-col gap-5 md:w-[50%]">
            <Title className="text-lg md:text-xl lg:text-2xl xl:text-3xl">
              {data.name}
            </Title>
            <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2">
              <PriceTag
                regularPrice={data.regularPrice}
                discountedPrice={data.discountedPrice}
                className="text-xl"
              />
              <div className="inline-flex items-center gap-2">
                <div title={String(data.rating)}>
                  <Rating
                    style={{ maxWidth: 110 }}
                    value={data.rating}
                    readOnly={true}
                  />
                </div>
                <span className="font-semibold xl:text-lg">
                  ({data.reviews} reviews)
                </span>
              </div>
            </div>
            <p className="text-lg">
              You are saving{' '}
              <FormattedPrice
                price={data.regularPrice - data.discountedPrice}
                className="font-semibold"
              />{' '}
              upon purchase!
            </p>
            <div className="xs:grid-cols-2 grid gap-2">
              <AddToCartButton item={data} />
              <WishListButton item={data} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductItem;
