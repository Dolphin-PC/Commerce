import Header from "./Header";

interface Props {
  children: React.ReactNode;
}
const MainLayout = ({ children }: Props) => {
  return (
    <div>
      <div className="sticky top-0 p-4" style={{ boxShadow: "0px 2px 2px -2px gray" }}>
        <Header />
      </div>
      <div className="container mt-8">{children}</div>
    </div>
  );
};

export default MainLayout;
