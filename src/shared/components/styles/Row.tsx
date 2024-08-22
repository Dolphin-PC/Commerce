import { HTMLAttributes } from "react";

interface Props {
  children: React.ReactNode;
  className?: HTMLAttributes<HTMLDivElement>["className"];
}

const Row = ({ children, className }: Props) => {
  return (
    <div className={`flex flex-row items-center ${className ? className : ""}`}>
      {children}
    </div>
  );
};

export default Row;
