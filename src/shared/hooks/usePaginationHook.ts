import { useCallback, useState } from "react";

interface Props {
  initialPageNumber: number;
  initialPageSize?: number;
  totalCount?: number;
}

interface Return {
  pageNumber: number;
  pageSize: number;
  getPages: (totalCount?: number) => number[];
  handleChangePage: (page: number) => void;
}

export const usePaginationHook = ({ initialPageNumber, initialPageSize = 10 }: Props): Return => {
  const [pageNumber, setPageNumber] = useState<number>(initialPageNumber);
  const [pageSize, _] = useState<number>(initialPageSize);

  const handleChangePage = (page: number) => {
    setPageNumber(page);
  };

  const getPages = useCallback((totalCount?: number): number[] => {
    if (!totalCount) return [];

    return Array(Math.ceil(totalCount / pageSize))
      .fill(0)
      .map((_, i) => i);
  }, []);

  return {
    pageNumber,
    pageSize,
    getPages,
    handleChangePage,
  };
};
