import { HTMLAttributes } from "react";

interface Props {
  children: React.ReactNode;
  className?: HTMLAttributes<HTMLDivElement>["className"];
}

const Column = ({ children, className }: Props) => {
  return <div className={`flex flex-col ${className}`}>{children}</div>;
};

export default Column;
