interface Props {
  children: React.ReactNode;
}
const CenterLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {children}
    </div>
  );
};

export default CenterLayout;
