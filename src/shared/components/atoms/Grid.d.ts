import React, { HTMLAttributes } from "react";
interface Props {
    children: React.ReactNode;
    className?: HTMLAttributes<HTMLDivElement>["className"];
}
declare const Grid: ({ children, className }: Props) => import("react/jsx-runtime").JSX.Element;
export default Grid;
