import { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
/**
 * 페이지 이동시, 스크롤을 최상단으로 이동시키는 Hook
 */
export const useScrollTop = () => {
    const navi = useNavigate();
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, [navi]);
};
