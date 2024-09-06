import { cn } from "@/shared/lib/shadcn-util";
import Header from "../Header";

interface Props {
  headerChildren?: React.ReactNode;
  children: React.ReactNode;
  className?: HTMLDivElement["className"];
  mainClassName?: HTMLDivElement["className"];
}
const MainLayout = ({ children, className, mainClassName, headerChildren }: Props) => {
  if (!headerChildren) {
    headerChildren = (
      <Header>
        <Header.SearchDrawer />
      </Header>
    );
  }

  return (
    <div className={className}>
      <div className="sticky top-0 p-4 bg-white z-50" style={{ boxShadow: "0px 2px 2px -2px gray" }}>
        {headerChildren}
      </div>
      <main className={cn("container mt-8", mainClassName)}>{children}</main>
    </div>
  );
};

export default MainLayout;
