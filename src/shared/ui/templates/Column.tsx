interface Props {
  children: React.ReactNode;
  gap?: number;
}

const Column = ({ children, gap }: Props) => {
  return <div className={`flex flex-col gap-[${gap}px]`}>{children}</div>;
};

export default Column;
