import { HTMLAttributes } from "react";

interface Props {
  children: React.ReactNode;
  gap?: number;
  className?: HTMLAttributes<HTMLDivElement>["className"];
}

const Row = ({ children, gap, className }: Props) => {
  return (
    <div
      className={`flex flex-row items-center 
        ${gap ? `gap-[${gap}px]` : ""} ${className ? className : ""}`}
    >
      {children}
    </div>
  );
};

export default Row;
