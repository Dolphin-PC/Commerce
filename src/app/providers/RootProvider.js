import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Fragment } from "react/jsx-runtime";
import { HelmetProvider } from "react-helmet-async";
const queryClient = new QueryClient();
export const RootProvider = ({ children }) => {
    return (_jsx(Fragment, { children: _jsxs(QueryClientProvider, { client: queryClient, children: [_jsx(ReactQueryDevtools, { initialIsOpen: false }), _jsx(HelmetProvider, { children: children })] }) }));
};
