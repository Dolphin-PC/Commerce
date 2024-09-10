interface GridWindowLayoutProps {
    hasNextPage: boolean;
    isNextPageLoading: boolean;
    childrens: React.ReactNode[];
    fetchNextPage: () => void;
    /** 한 줄에 보여질 개수 */
    columnCount: number;
    /** 한 줄의 높이 */
    rowHeight: number;
}
export declare const GridWindowLayout: ({ childrens, fetchNextPage, hasNextPage, isNextPageLoading, columnCount, rowHeight }: GridWindowLayoutProps) => import("react/jsx-runtime").JSX.Element;
interface ListWindowLayoutProps {
    hasNextPage: boolean;
    isNextPageLoading: boolean;
    childrens: React.ReactNode[];
    fetchNextPage: () => void;
    itemHeight: number;
}
export declare const ListWindowLayout: ({ hasNextPage, isNextPageLoading, fetchNextPage, childrens, itemHeight }: ListWindowLayoutProps) => import("react/jsx-runtime").JSX.Element;
export {};
