import { PropsWithChildren } from "react";
import Row from "../atoms/Row";
import { DropdownMenuItem } from "../ui/dropdown-menu";

/**
 * @desc DropdownMenuItem Wapper
 */
const DropdownItem = ({ children, onClick }: PropsWithChildren<{ onClick?: () => void }>) => {
  return (
    <DropdownMenuItem className="cursor-pointer" onClick={onClick}>
      <Row className="items-center gap-2">{children}</Row>
    </DropdownMenuItem>
  );
};

export default DropdownItem;
