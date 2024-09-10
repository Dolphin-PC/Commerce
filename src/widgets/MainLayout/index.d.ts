interface Props {
    headerChildren?: React.ReactNode;
    subHeaderChildren?: React.ReactNode;
    children: React.ReactNode;
    className?: HTMLDivElement["className"];
    mainClassName?: HTMLDivElement["className"];
}
declare const MainLayout: ({ children, className, mainClassName, headerChildren, subHeaderChildren }: Props) => import("react/jsx-runtime").JSX.Element;
export default MainLayout;
