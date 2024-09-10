import { jsx as _jsx } from "react/jsx-runtime";
export const H1 = ({ children, className }) => {
    return _jsx("h1", { className: `scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ${className}`, children: children });
};
export const H2 = ({ children, className }) => {
    return _jsx("h2", { className: `scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 ${className}`, children: children });
};
export const H3 = ({ children, className }) => {
    return _jsx("h3", { className: `scroll-m-20 text-2xl font-semibold tracking-tight ${className}`, children: children });
};
export const H4 = ({ children, className }) => {
    return _jsx("h4", { className: `scroll-m-20 text-xl font-semibold tracking-tight ${className}`, children: children });
};
export const P = ({ children, className }) => {
    return _jsx("p", { className: `leading-7 ${className}`, children: children });
};
export const Lead = ({ children, className }) => {
    return _jsx("p", { className: `text-md text-muted-foreground ${className}`, children: children });
};
export const Muted = ({ children, className }) => {
    return _jsx("p", { className: `text-sm text-muted-foreground ${className}`, children: children });
};
export const Small = ({ children, className }) => {
    return _jsx("small", { className: `text-sm font-medium leading-none ${className}`, children: children });
};
export const Large = ({ children, className }) => {
    return _jsx("small", { className: `text-sm font-medium leading-none ${className}`, children: children });
};
export const Blockquote = ({ children, className }) => {
    return _jsx("blockquote", { className: `mt-6 border-l-2 pl-6 italic ${className}`, children: children });
};
export const T = {
    H1,
    H2,
    H3,
    H4,
    P,
    Lead,
    Muted,
    Small,
    Large,
    Blockquote,
};
