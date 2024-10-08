import { CartProductCategory } from "@/features/cart/type";
import { useDeleteOrderDetail } from "@/features/order_detail/api/delete-order_detail";
import { usePostOrderDetail } from "@/features/order_detail/api/post-order_detail";
import { usePutOrderDetail } from "@/features/order_detail/api/put-order_detail";
import { OrderDetail } from "@/features/order_detail/type";
import { useProductQuantityHooks } from "@/features/product/hooks/useProductQuantityHooks";
import { useDeleteOrder } from "../../features/order/api/delete-order";
import { usePostOrder } from "../../features/order/api/post-order";
import { Order } from "../../features/order/type";
import { Product } from "@/features/product/type/type";
import { User } from "@/features/user/model/type";

interface Return {
  /** 장바구니를 통한 Order생성 */
  handleNewOrderByCart: (cartList: CartProductCategory[]) => Promise<Order>;
  handleNewOrder: ({ userId, productId, quantity }: handleNewOrderProps) => Promise<{ order: Order; orderDetail: OrderDetail }>;
}

interface handleNewOrderProps {
  userId: User["id"];
  productId: Product["id"];
  quantity: OrderDetail["quantity"];
}

/**
 * @desc 주문 생성 Hooks
 *  1. 주문::생성
 *  2. 주문상세::생성
 *  3. 상품::재고 수량 감소
 *  4. 장바구니::해당 상품 삭제
 */
export const useNewOrderHook = (): Return => {
  const postOrder = usePostOrder();
  const deleteOrder = useDeleteOrder();

  const postOrderDetailMutation = usePostOrderDetail();
  const deleteOrderDetailMutation = useDeleteOrderDetail();
  const putOrderDetailMutation = usePutOrderDetail();

  const { handleDecrease, handleIncrease } = useProductQuantityHooks();

  interface postNewOrderProps {
    userId: Order["userId"];
  }

  //* 주문 생성
  const postNewOrder = async ({ userId }: postNewOrderProps): Promise<Order> => {
    // 1. 주문::생성
    return await postOrder
      .mutateAsync({
        insert: {
          status: "PAY_BEFORE",
          userId,
        },
      })
      .catch(() => {
        throw Error("주문 생성에 실패했습니다.");
      });
  };

  //* 장바구니에서 주문 생성
  const handleNewOrderByCart = async (cartList: CartProductCategory[]): Promise<Order> => {
    return new Promise(async (resolve, reject) => {
      try {
        if (cartList.length === 0) reject("구매할 상품이 없습니다.");

        const newOrder = await postNewOrder({ userId: cartList[0].userId });

        /**
         * @desc 재고수량 감소할 때, 오류발생시 처리 방법
         * (1) 주문상세-상품::재고수량 감소 1건씩 처리
         *  - 이유 : 재고수량을 감소하다가 중간 오류 발생시, 전체 롤백을 해야하는데 이미 수량이 감소되지 않은 건에 대해 롤백을 하는 경우가 우려 (어떤 건만 롤백해야 할지 구분이 안되기 떄문에, 전체 롤백을 해야 함)
         *  - 예시 : A,B,C 주문상세가 있을 때, A,B는 재고수량 감소 성공, C는 감소 실패시, C는 증가시키지 않아야 하나 C도 같이 증가시켜야 함
         *
         * Spring @Transactional이 있었으면 편했을 텐데
         *
         * (2) <- 선택
         *  - 주문상세를 만들되, 수량을 0으로 insert
         *  - 이후, 1개씩 product의 수량을 감소시키면서, order_detail의 수량을 증가
         *    - 이렇게 하면, product수량 감소 오류시, order_detail의 수량으로 증가시키면 롤백이 가능 (모든 order_detail의 수량으로 증가시키면 됨, 오류가 발생한 부분은 order_detail이 0이기 떄문에)
         *    - 만약, order_detail수량 증가 오류가 발생한다면, 해당 수량으로 product수량을 증가시키면 롤백이 가능
         */

        // 2. 주문상세::생성 (수량이 0인 상태)
        const orderDetailCartList: [OrderDetail, CartProductCategory][] = await Promise.all(
          cartList.map(async (cart) => {
            const newOrderDetail = await postOrderDetailMutation
              .mutateAsync({
                insert: {
                  orderId: newOrder.id,
                  productId: cart.productId,
                  quantity: 0,
                  status: "ORDER_WAIT",
                },
              })
              .catch(() => {
                // 주문상세 생성 실패 시 주문 삭제
                deleteOrder.mutateAsync({ id: newOrder.id });
                throw Error("주문상세 생성에 실패했습니다.");
              });
            return [newOrderDetail, cart] as [OrderDetail, CartProductCategory];
          })
        );

        // 3. 상품재고 수량을 감소시키면서, 주문상세 수량 증가
        try {
          await Promise.all(
            orderDetailCartList.map(async (orderDetailCart, index) => {
              const [orderDetail, cart] = orderDetailCart;
              // product 재고 감소
              await handleDecrease({ productId: orderDetail.productId, quantity: cart.quantity });

              // 주문상세::수량 증가, 증가된 주문상세를 orderDetailCart에 업데이트
              orderDetailCart[index] = await putOrderDetailMutation
                .mutateAsync({
                  id: orderDetail.id,
                  update: {
                    quantity: cart.quantity,
                  },
                })
                .catch(() => {
                  // 주문상세 수량 증가 실패 시, 해당 수량으로 product 수량 증가
                  handleIncrease({ productId: orderDetail.productId, quantity: cart.quantity });
                  throw Error("주문상세 수량 증가에 실패했습니다.");
                });
            })
          );
        } catch (err) {
          // 상품수량에 [주문상세 수량]만큼 증가 && 주문상세 삭제
          await Promise.all(
            orderDetailCartList.map(async ([orderDetail, _]) => {
              await handleIncrease({ productId: orderDetail.productId, quantity: orderDetail.quantity });
              await deleteOrderDetailMutation.mutateAsync({ id: orderDetail.id });
            })
          );

          throw Error("상품 재고 감소에 실패했습니다.");
        }

        resolve(newOrder);
      } catch (error) {
        reject(error);
      }
    });
  };

  //* 즉시 주문
  const handleNewOrder = async ({ userId, productId, quantity }: handleNewOrderProps): Promise<{ order: Order; orderDetail: OrderDetail }> => {
    const order: Order = await postNewOrder({ userId });

    const orderDetail: OrderDetail = await postOrderDetailMutation.mutateAsync({ insert: { orderId: order.id, quantity, productId } });

    await handleDecrease({ productId, quantity });

    return { order, orderDetail };
  };

  return { handleNewOrderByCart, handleNewOrder };
};
