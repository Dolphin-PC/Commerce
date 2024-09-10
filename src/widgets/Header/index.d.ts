import { PropsWithChildren } from "react";
/**
 * @desc 공통 헤더
 */
declare const Header: {
    ({ children }: PropsWithChildren): import("react/jsx-runtime").JSX.Element;
    SearchDrawer: () => import("react/jsx-runtime").JSX.Element;
};
export default Header;
