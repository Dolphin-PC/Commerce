import { useEffect } from "react";
import { IntersectionOptions, useInView } from "react-intersection-observer";

interface Props {
  hasNextPage: boolean;
  fetchNextPage: () => void;
  options?: IntersectionOptions;
}

interface Return {
  ref: (node?: Element | null | undefined) => void;
}

/**
 * 무한 스크롤, useInView 훅을 사용
 */
const useInfiniteInView = ({ hasNextPage, fetchNextPage, options }: Props): Return => {
  const { ref, inView } = useInView(options);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  return { ref };
};

export default useInfiniteInView;
