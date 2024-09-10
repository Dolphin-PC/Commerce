import { Category } from "../model/type";
import { Tables } from "@/shared/config/@db/database-generated.type";
interface Props {
    id: Tables<"category">["id"];
}
type Return = Category | null;
export declare const useCategoryQuery: (props: Props) => import("@tanstack/react-query").UseQueryResult<Return, Error>;
export {};
