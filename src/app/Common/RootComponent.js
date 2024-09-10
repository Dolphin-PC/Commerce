import { jsx as _jsx } from "react/jsx-runtime";
import { useAutoAuth } from "@/features/@auth/hooks/useAutoAuth";
import { Toaster } from "@/shared/components/ui/toaster";
import { Fragment } from "react/jsx-runtime";
const RootComponent = () => {
    useAutoAuth();
    return (_jsx(Fragment, { children: _jsx(Toaster, {}) }));
};
export default RootComponent;
