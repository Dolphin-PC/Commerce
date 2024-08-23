import React, { HTMLAttributes } from "react";

interface Props {
  children: React.ReactNode;
  className?: HTMLAttributes<HTMLDivElement>["className"];
}

const Grid = ({ children, className }: Props) => {
  return <div className={`grid ${className}`}>{children}</div>;
};

export default Grid;
