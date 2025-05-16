import { useRef, useState } from 'react';
import ReactPaginate from 'react-paginate';

import { useGetProductsQuery } from '@api/publicApiSlice';

import { ProductCard } from './../ProductCard';

const itemsPerPage = 12;

export const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { data: response, isSuccess } = useGetProductsQuery({
    page: currentPage,
    limit: itemsPerPage,
  });

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected + 1);

    if (wrapperRef.current) {
      window.scrollTo({
        top: wrapperRef.current.offsetTop - 200,
        left: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div ref={wrapperRef}>
      {isSuccess && (
        <>
          <ul className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6 pt-8">
            {response.items.map((item) => (
              <li key={item._id}>
                <ProductCard item={item} />
              </li>
            ))}
          </ul>
          <ReactPaginate
            breakLabel="..."
            nextLabel={null}
            previousLabel={null}
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={Math.ceil(response.total / itemsPerPage)}
            renderOnZeroPageCount={null}
            containerClassName="flex pt-8 gap-2 text-white font-semibold"
            pageClassName="w-9 h-9 border-1 border-black hover:border-gray-500 rounded-md bg-dark hover:bg-white hover:text-black duration-200 cursor-pointer"
            activeClassName="bg-white text-black"
            breakClassName="text-black flex items-end"
            pageLinkClassName="block w-full h-full flex items-center justify-center"
            previousClassName="hidden"
            nextClassName="hidden"
          />
        </>
      )}
    </div>
  );
};
