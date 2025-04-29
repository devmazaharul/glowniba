import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const PaginationUI = ({
  currentPage,
  totalPage,
}: {
  currentPage: number;
  totalPage: number;
}) => {
  
  const getVisiblePages = () => {
    const maxPages = 3;
    if (totalPage <= maxPages) {
      return Array.from({ length: totalPage }, (_, i) => i + 1);
    }

    const start = Math.max(currentPage - 2, 1);
    const end = Math.min(start + maxPages - 1, totalPage);

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex justify-center items-center my-5">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={`?page=${Math.max(currentPage - 1, 1)}`}
            />
          </PaginationItem>

          {visiblePages[0] > 1 && (
            <>
              <PaginationItem>
                <PaginationLink href="?page=1">1</PaginationLink>
              </PaginationItem>
              {visiblePages[0] > 2 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
            </>
          )}

          {visiblePages.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href={`?page=${page}`}
                isActive={currentPage === page}
                className={`${page==currentPage?'bg-gray-100':""}`}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {visiblePages[visiblePages.length - 1] < totalPage && (
            <>
              {visiblePages[visiblePages.length - 1] < totalPage - 1 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationLink href={`?page=${totalPage}`}>
                  {totalPage}
                </PaginationLink>
              </PaginationItem>
            </>
          )}

          <PaginationItem>
            <PaginationNext
              href={`?page=${Math.min(currentPage + 1, totalPage)}`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationUI;
