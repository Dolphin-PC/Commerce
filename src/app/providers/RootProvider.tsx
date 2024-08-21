import { Toaster } from "@/shared/ui/ui/toaster";
import { Fragment } from "react/jsx-runtime";

interface Props {
  children: React.ReactNode;
}
export const RootProvider = ({ children }: Props) => {
  return (
    <Fragment>
      {children}
      <Toaster />
    </Fragment>
  );
};
