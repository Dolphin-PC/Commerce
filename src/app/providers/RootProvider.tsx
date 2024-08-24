import ErrorFallback from "@/shared/components/molecules/ErrorFallback";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorBoundary } from "react-error-boundary";
import { Fragment } from "react/jsx-runtime";

const queryClient = new QueryClient();

interface Props {
  children: React.ReactNode;
}
export const RootProvider = ({ children }: Props) => {
  return (
    <Fragment>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={true} />
          {children}
        </QueryClientProvider>
      </ErrorBoundary>
    </Fragment>
  );
};
