import { HTMLAttributes } from "react";
interface Props {
    children: React.ReactNode;
    className?: HTMLAttributes<HTMLDivElement>["className"];
}
declare const Row: ({ children, className }: Props) => import("react/jsx-runtime").JSX.Element;
export default Row;
