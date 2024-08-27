import { Button } from "@/shared/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/shared/components/ui/drawer";

interface Props {
  type: "link" | "drawer";
}

/**
 * @desc 장바구니 보기 버튼 (링크 or Drawer)
 *
 */
const CartViewButton = ({ type }: Props) => {
  return (
    <Drawer direction="right">
      <DrawerTrigger>장바구니 보기</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>내 장바구니</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CartViewButton;
