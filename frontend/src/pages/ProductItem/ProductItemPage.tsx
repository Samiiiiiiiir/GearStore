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

export const ProductItem = () => {
  const [activeImage, setActiveImage] = useState(0);

  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isFetching, isSuccess } = useGetOneProductQuery(id!);

  useEffect(() => {
    if (isSuccess && !data) {
      navigate('/');
    }
  }, [isSuccess, data]);

  return (
    <>
      {(isLoading || isFetching) && <PageLoader />}
      {isSuccess && data && (
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex flex-col-reverse md:flex-row md:w-[50%] justify-center md:justify-start gap-10 md:gap-5">
            <div className="flex justify-center md:justify-start md:pt-0 md:flex-col gap-1 shrink-0">
              {data.images.map((item, i) => (
                <img
                  key={i}
                  src={item}
                  alt=""
                  onClick={() => setActiveImage(i)}
                  className={`w-16 xl:w-24 aspect-square cursor-pointer object-scale-down p-1 border-1 rounded-sm border-gray-500 hover:opacity-100 duration-300 ${
                    activeImage == i ? 'opacity-100' : 'opacity-80'
                  }`}
                />
              ))}
            </div>
            <div className="grow min-h-80 overflow-hidden relative">
              <img
                src={data.images[activeImage]}
                alt={data.name}
                className="w-full h-full object-scale-down absolute inset-0"
              />
            </div>
          </div>
          <div className="flex md:w-[50%] flex-col gap-5">
            <Title className="text-lg md:text-xl lg:text-2xl xl:text-4xl">
              {data.name}
            </Title>
            <div className="flex justify-between items-center flex-wrap gap-y-2 gap-x-8">
              <PriceTag
                regularPrice={data.regularPrice}
                discountedPrice={data.discountedPrice}
                className="text-xl"
              />
              <div className="inline-flex gap-2 items-center">
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
            <div className="grid grid-cols-2 gap-5">
              <AddToCartButton item={data} />
              <WishListButton item={data} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
