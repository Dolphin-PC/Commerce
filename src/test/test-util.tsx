import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, RenderResult } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent, { UserEvent } from "@testing-library/user-event";

export * from "@testing-library/react";

/**
 * @desc 라우터를 사용하는 테스트 렌더링
 * @param ui 보일 컴포넌트
 * @param {route} route 라우터 경로
 * @see https://testing-library.com/docs/example-react-router/#reducing-boilerplate
 */
export const renderWithRouter = (ui: ReactNode, { route = "/" } = {}): RenderResult => {
  window.history.pushState({}, "Test page", route);

  return render(ui, { wrapper: BrowserRouter });
};

export const setupUser = (): UserEvent => {
  return userEvent.setup();
};

export const queryWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // 재시도에 의해 중복 요청이 발생하는 것을 방지
      },
    },
  });

  return ({ children }: { children: ReactNode }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
