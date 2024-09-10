import { RefundHistory, RefundHistoryInsert } from "../type";
/**
 * @desc 환불 내역 추가
 */
interface Props {
    inserts: RefundHistoryInsert[];
}
interface Return extends RefundHistory {
}
export declare const usePostRefundHistoryMutation: () => import("@tanstack/react-query").UseMutationResult<Return[], Error, Props, unknown>;
export {};
