import LogoIcon from "@/shared/components/molecules/LogoIcon";
import Row from "../../shared/components/atoms/Row";
import ProductSearchDrawer from "../ProductSearchDrawer";
import UserMenu from "./ui/UserMenu";
import LoginButton from "./ui/LoginButton";
import { PropsWithChildren } from "react";

/**
 * @desc 공통 헤더
 */
const Header = ({ children }: PropsWithChildren) => {
  return (
    <div className="container">
      <Row className="w-full justify-between items-center">
        <LogoIcon />

        {children}
        <Row className="gap-[40px]">
          <LoginButton />
          <UserMenu />
        </Row>
      </Row>
    </div>
  );
};

Header.SearchDrawer = ProductSearchDrawer;
export default Header;
