import { useAutoAuth } from "@/features/@auth/hooks/useAutoAuth";
import { Toaster } from "@/shared/components/ui/toaster";
import { Fragment } from "react/jsx-runtime";

const RootComponent = () => {
  useAutoAuth();
  return (
    <Fragment>
      <Toaster />
    </Fragment>
  );
};

export default RootComponent;
