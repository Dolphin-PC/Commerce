import Header from "./Header";

interface Props {
  children: React.ReactNode;
}
const MainLayout = ({ children }: Props) => {
  return (
    <div className="h-screen">
      <div className="sticky top-0 p-4 bg-white z-50" style={{ boxShadow: "0px 2px 2px -2px gray" }}>
        <Header />
      </div>
      <div className="container h-5/6 pt-8">{children}</div>
    </div>
  );
};

export default MainLayout;
