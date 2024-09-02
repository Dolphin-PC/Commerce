import { useAuthStore } from "@/features/@auth/store/auth.store";
import { useCartProductCategoryQuery } from "@/features/cart/api/get_list-cart_product_category";
import CartCard from "@/features/cart/ui/CartCard";
import Column from "@/shared/components/atoms/Column";
import Row from "@/shared/components/atoms/Row";
import { H4 } from "@/shared/components/atoms/Typography";
import { Checkbox } from "@/shared/components/ui/checkbox";
import MainLayout from "@/widgets/layout/MainLayout";

/**
 * @desc 장바구니 화면
 */
const CartPage = () => {
  const user = useAuthStore((state) => state.getUser());
  const cart = useCartProductCategoryQuery({ userId: user.id });

  return (
    <MainLayout>
      <Column className="gap-2">
        <Row className="items-center gap-2">
          <Checkbox id="all-carts" className="h-6 w-6" />
          <label htmlFor="all-carts">
            <H4>전체 선택</H4>
          </label>
        </Row>
        {cart.data && (
          <Column className="gap-3">
            {cart.data.map((cart) => (
              <CartCard key={cart.id} cart={cart}>
                <Checkbox id="all-carts" className="h-6 w-6" />

                <CartCard.Product />
              </CartCard>
            ))}
          </Column>
        )}
      </Column>
    </MainLayout>
  );
};

export default CartPage;
