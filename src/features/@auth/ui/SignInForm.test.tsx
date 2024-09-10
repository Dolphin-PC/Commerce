// import { fireEvent, render, screen, waitFor } from "@/test/test-util";
// import { expect } from "vitest";
// import SignInPage from "@/pages/SignInPage";
// import { MemoryRouter, Route, Routes } from "react-router-dom";
// import { ROUTES } from "@/shared/consts/route.const";
// import HomePage from "@/pages/HomePage";
// import DashBoardPage from "@/pages/DashBoardPage";
// import { RootProvider } from "@/app/providers/RootProvider";
// import userEvent from "@testing-library/user-event";

// describe("로그인 성공", async () => {
//   it(" [대시보드]화면으로 이동", async () => {
//     render(
//       <RootProvider>
//         <MemoryRouter initialEntries={[ROUTES.SIGNIN]}>
//           <Routes>
//             <Route path={ROUTES.HOME} element={<HomePage />} />
//             <Route path={ROUTES.SIGNIN} element={<SignInPage />} />
//             <Route path={ROUTES.DASHBOARD} element={<DashBoardPage />} />
//           </Routes>
//         </MemoryRouter>
//       </RootProvider>
//     );

//     const user = userEvent.setup();

//     // given
//     const emailInput = screen.getByPlaceholderText("Email");
//     const passwordInput = screen.getByPlaceholderText("Password");
//     const button = screen.getByText("Sign In");

//     expect(emailInput).toBeInTheDocument();
//     expect(passwordInput).toBeInTheDocument();
//     expect(button).toBeInTheDocument();

//     // when
//     const USER_SELLER_ID = import.meta.env.VITE_USER_SELLER_ID as string;
//     const USER_SELLER_PASSWORD = import.meta.env.VITE_USER_SELLER_PASSWORD as string;

//     fireEvent.change(emailInput, { target: { value: USER_SELLER_ID } });
//     fireEvent.change(passwordInput, { target: { value: USER_SELLER_PASSWORD } });
//     await user.click(button);

//     await waitFor(
//       () => {
//         // then
//         // 대시보드 화면 이동
//         const dashboard = screen.getByText("대시보드", { selector: "h2" });
//         expect(dashboard).toBeInTheDocument();
//       },
//       { timeout: 5000 }
//     );
//   });
// });

// describe("로그인 실패", async () => {
//   it("유효하지 않은 이메일", async () => {
//     const { user } = renderWithRouter(<SignInPage />, { route: ROUTES.SIGNIN });

//     // given
//     const emailInput = screen.getByPlaceholderText("Email");
//     expect(emailInput).toBeInTheDocument();

//     const button = screen.getByText("Sign In");
//     await user.click(button);

//     // when-then
//     const errorMessage = screen.getByText("이메일 형식이 아닙니다.");

//     fireEvent.change(emailInput, { target: { value: "test@" } });
//     expect(errorMessage).toBeInTheDocument();

//     fireEvent.change(emailInput, { target: { value: "test@321" } });
//     expect(errorMessage).toBeInTheDocument();

//     fireEvent.change(emailInput, { target: { value: "test@321.com" } });
//     // 비동기적으로 요소를 찾기
//     await waitFor(() => {
//       expect(errorMessage).not.toBeInTheDocument();
//     });
//   });

//   it("유효하지 않은 비밀번호", async () => {
//     const { user } = renderWithRouter(<SignInPage />, { route: ROUTES.SIGNIN });

//     // given
//     const button = screen.getByText("Sign In");
//     await user.click(button);

//     const passwordInput = screen.getByPlaceholderText("Password");
//     const error = screen.getByTestId("error-password");

//     // when-then
//     fireEvent.change(passwordInput, { target: { value: "1234" } });
//     await waitFor(() => {
//       expect(error).toHaveTextContent("비밀번호는 최소 10자 이상이어야 합니다.");
//     });

//     fireEvent.change(passwordInput, { target: { value: "3123dasddasd" } });
//     await waitFor(() => {
//       expect(error).toHaveTextContent("비밀번호는 문자, 숫자, 특수문자 중 3가지 이상을 포함해야 합니다.");
//     });

//     fireEvent.change(passwordInput, { target: { value: "dasjkld123!@#" } });
//     await waitFor(() => {
//       expect(error).not.toBeInTheDocument();
//     });
//   });
// });
