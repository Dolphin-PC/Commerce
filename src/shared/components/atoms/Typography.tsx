import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: HTMLHeadElement["className"];
}

export const H1 = ({ children, className }: Props) => {
  return <h1 className={`scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ${className}`}>{children}</h1>;
};

export const H2 = ({ children, className }: Props) => {
  return <h2 className={`scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 ${className}`}>{children}</h2>;
};

export const H3 = ({ children, className }: Props) => {
  return <h3 className={`scroll-m-20 text-2xl font-semibold tracking-tight ${className}`}>{children}</h3>;
};

export const H4 = ({ children, className }: Props) => {
  return <h4 className={`scroll-m-20 text-xl font-semibold tracking-tight ${className}`}>{children}</h4>;
};

export const P = ({ children, className }: Props) => {
  return <p className={`leading-7 ${className}`}>{children}</p>;
};

export const Lead = ({ children, className }: Props) => {
  return <p className={`text-md text-muted-foreground ${className}`}>{children}</p>;
};

export const Muted = ({ children, className }: Props) => {
  return <p className={`text-sm text-muted-foreground ${className}`}>{children}</p>;
};

export const Small = ({ children, className }: Props) => {
  return <small className={`text-sm font-medium leading-none ${className}`}>{children}</small>;
};

export const Large = ({ children, className }: Props) => {
  return <small className={`text-sm font-medium leading-none ${className}`}>{children}</small>;
};

export const Blockquote = ({ children, className }: Props) => {
  return <blockquote className={`mt-6 border-l-2 pl-6 italic ${className}`}>{children}</blockquote>;
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
