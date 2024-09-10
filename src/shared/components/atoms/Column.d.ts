import { HTMLAttributes } from "react";
interface Props {
    children: React.ReactNode;
    className?: HTMLAttributes<HTMLDivElement>["className"];
}
export declare const Column: ({ children, className }: Props) => import("react/jsx-runtime").JSX.Element;
export default Column;
