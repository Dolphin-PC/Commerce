import { IntersectionOptions } from "react-intersection-observer";
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
declare const useInfiniteInView: ({ hasNextPage, fetchNextPage, options }: Props) => Return;
export default useInfiniteInView;
