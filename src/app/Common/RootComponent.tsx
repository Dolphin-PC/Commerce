import { useAuth } from "@/features/auth/auth.hook";
import { Toaster } from "@/shared/components/ui/toaster";
import { Fragment } from "react/jsx-runtime";

const RootComponent = () => {
  useAuth();
  return (
    <Fragment>
      <Toaster />
    </Fragment>
  );
};

export default RootComponent;
