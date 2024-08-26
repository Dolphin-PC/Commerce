import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const H1 = ({ children: text }: Props) => {
  return <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">{text}</h1>;
};

export const H2 = ({ children: text }: Props) => {
  return <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">{text}</h2>;
};

export const H3 = ({ children: text }: Props) => {
  return <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">{text}</h3>;
};

export const H4 = ({ children: text }: Props) => {
  return <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">{text}</h4>;
};

export const P = ({ children: text }: Props) => {
  return <p className="leading-7">{text}</p>;
};

export const Lead = ({ children: text }: Props) => {
  return <p className="text-xl text-muted-foreground">{text}</p>;
};
