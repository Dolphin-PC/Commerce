import { HTMLAttributes } from "react";

interface Props {
  children: React.ReactNode;
  gap?: number;
  className?: HTMLAttributes<HTMLDivElement>["className"];
}

const Row = ({ children, gap, className }: Props) => {
  return (
    <div className={`flex flex-row gap-[${gap}]px items-center ${className}`}>
      {children}
    </div>
  );
};

export default Row;
