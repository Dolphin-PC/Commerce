import { ReactNode } from "react";
import "@testing-library/dom";
export * from "@testing-library/react";
/**
 * @desc 라우터를 사용하는 테스트 렌더링
 * @param ui 보일 컴포넌트
 * @param {route} route 라우터 경로
 * @see https://testing-library.com/docs/example-react-router/#reducing-boilerplate
 */
export declare const queryWrapper: () => ({ children }: {
    children: ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
