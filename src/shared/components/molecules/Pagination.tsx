import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import * as P from "../ui/pagination";
import { useMemo } from "react";

interface Props {
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;

  /** 데이터 총개수 */
  totalCount: number;
}

/**
 * @desc Pagination
 */
const Pagination = ({ pageNumber, pageSize, setPageNumber, totalCount }: Props) => {
  const pageCount: number = useMemo(() => Math.ceil(totalCount / pageSize), [totalCount, pageSize]);
  const pages: number[] = useMemo(
    () =>
      Array(pageCount)
        .fill(0)
        .map((_, i) => i),
    [pageCount]
  );

  const handleChangePage = (page: number) => {
    setPageNumber(page);
  };

  return (
    <P.Pagination>
      <P.PaginationContent>
        <P.PaginationItem onClick={() => pageNumber > 0 && handleChangePage(pageNumber - 1)}>
          <Button variant="ghost" size="icon">
            <ChevronLeft />
          </Button>
        </P.PaginationItem>
        {pages.map((page) => {
          return (
            <P.PaginationItem key={page} onClick={() => handleChangePage(page)}>
              <Button variant={page === pageNumber ? "outline" : "ghost"}>{page + 1}</Button>
            </P.PaginationItem>
          );
        })}
        <P.PaginationItem onClick={() => pageNumber + 1 < pages.length && handleChangePage(pageNumber + 1)}>
          <Button variant="ghost" size="icon">
            <ChevronRight />
          </Button>
        </P.PaginationItem>
      </P.PaginationContent>
    </P.Pagination>
  );
};

export default Pagination;
