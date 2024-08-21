import { HTMLAttributes } from "react";

interface Props {
  children: React.ReactNode;
  gap?: number;
  className?: HTMLAttributes<HTMLDivElement>["className"];
}

const Column = ({ children, gap, className }: Props) => {
  return (
    <div
      className={`flex flex-col ${gap ? `gap-[${gap}px]` : ""} ${className}`}
    >
      {children}
    </div>
  );
};

export default Column;
