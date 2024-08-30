import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Fragment } from "react/jsx-runtime";

const queryClient = new QueryClient();

interface Props {
  children: React.ReactNode;
}
export const RootProvider = ({ children }: Props) => {
  return (
    <Fragment>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={true} />
        {children}
      </QueryClientProvider>
    </Fragment>
  );
};
