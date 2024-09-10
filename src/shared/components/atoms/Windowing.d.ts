import React from "react";
import { IntersectionOptions } from "react-intersection-observer";
interface Props {
    options?: IntersectionOptions;
    children: React.ReactNode;
}
declare const Windowing: ({ options, children }: Props) => import("react/jsx-runtime").JSX.Element;
export default Windowing;
