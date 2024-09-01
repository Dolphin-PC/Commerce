import { ReactNode } from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

export * from "@testing-library/react";

/**
 * @desc 라우터를 사용하는 테스트 렌더링
 * @param ui 보일 컴포넌트
 * @param {route} route 라우터 경로
 * @see https://testing-library.com/docs/example-react-router/#reducing-boilerplate
 */
export const renderWithRouter = (ui: ReactNode, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: BrowserRouter }),
  };
};
