interface Props {
    error: Error;
    resetErrorBoundary: () => void;
}
declare const ErrorFallback: ({ error, resetErrorBoundary }: Props) => import("react/jsx-runtime").JSX.Element;
export default ErrorFallback;
