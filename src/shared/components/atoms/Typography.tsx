import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: HTMLHeadElement["className"];
}

export const H1 = ({ children: text, className }: Props) => {
  return <h1 className={`scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ${className}`}>{text}</h1>;
};

export const H2 = ({ children: text, className }: Props) => {
  return <h2 className={`scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 ${className}`}>{text}</h2>;
};

export const H3 = ({ children: text, className }: Props) => {
  return <h3 className={`scroll-m-20 text-2xl font-semibold tracking-tight ${className}`}>{text}</h3>;
};

export const H4 = ({ children: text, className }: Props) => {
  return <h4 className={`scroll-m-20 text-xl font-semibold tracking-tight ${className}`}>{text}</h4>;
};

export const P = ({ children: text, className }: Props) => {
  return <p className={`leading-7 ${className}`}>{text}</p>;
};

export const Lead = ({ children: text, className }: Props) => {
  return <p className={`text-md text-muted-foreground ${className}`}>{text}</p>;
};

export const Muted = ({ children: text, className }: Props) => {
  return <p className={`text-sm text-muted-foreground ${className}`}>{text}</p>;
};

export const Small = ({ children: text, className }: Props) => {
  return <small className={`text-sm font-medium leading-none ${className}`}>{text}</small>;
};

export const Large = ({ children: text, className }: Props) => {
  return <small className={`text-sm font-medium leading-none ${className}`}>{text}</small>;
};
