import { cn } from "@/shared/lib/shadcn-util";
import Header from "../Header";

interface Props {
  headerChildren?: React.ReactNode;
  subHeaderChildren?: React.ReactNode;
  children: React.ReactNode;
  className?: HTMLDivElement["className"];
  mainClassName?: HTMLDivElement["className"];
}
const MainLayout = ({ children, className, mainClassName, headerChildren, subHeaderChildren }: Props) => {
  if (!headerChildren) {
    headerChildren = (
      <Header>
        <Header.SearchDrawer />
      </Header>
    );
  }

  return (
    <div className={className}>
      <div className="sticky top-0 z-50">
        <div className="bg-white p-4" style={{ boxShadow: "0px 2px 2px -2px gray" }}>
          {headerChildren}
        </div>
        {subHeaderChildren && subHeaderChildren}
      </div>
      <main className={cn("container mt-8 mb-2", mainClassName)}>{children}</main>
    </div>
  );
};

export default MainLayout;
