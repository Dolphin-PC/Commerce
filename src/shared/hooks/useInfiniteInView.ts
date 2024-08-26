import { UseSuspenseInfiniteQueryResult } from "@tanstack/react-query";
import { useEffect } from "react";
import { IntersectionOptions, useInView } from "react-intersection-observer";

interface Props {
  query: UseSuspenseInfiniteQueryResult;
  options?: IntersectionOptions;
}

interface Return {
  ref: (node?: Element | null | undefined) => void;
}

/**
 * 무한 스크롤, useInView 훅을 사용
 */
const useInfiniteInView = ({ query, options }: Props): Return => {
  const { ref, inView } = useInView(options);

  useEffect(() => {
    if (inView && query.hasNextPage) {
      query.fetchNextPage();
    }
  }, [query, inView]);

  return { ref };
};

export default useInfiniteInView;
