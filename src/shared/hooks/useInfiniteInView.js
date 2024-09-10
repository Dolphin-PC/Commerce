import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
/**
 * 무한 스크롤, useInView 훅을 사용
 */
const useInfiniteInView = ({ hasNextPage, fetchNextPage, options }) => {
    const { ref, inView } = useInView(options);
    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView]);
    return { ref };
};
export default useInfiniteInView;
