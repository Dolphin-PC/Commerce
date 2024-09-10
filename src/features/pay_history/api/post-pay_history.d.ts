import { PayHistory, PayHistoryInsert } from "../type";
interface Props {
    insert: PayHistoryInsert;
}
interface Return extends PayHistory {
}
export declare const usePostPayHistoryMutation: () => import("@tanstack/react-query").UseMutationResult<Return, Error, Props, unknown>;
export {};
