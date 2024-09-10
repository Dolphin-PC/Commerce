interface Props {
    children?: React.ReactNode;
    triggerComponent: React.ReactNode;
    title: string;
    description: string;
    cancelText?: string;
    cancelAction?: () => void;
    confirmText?: string;
    confirmAction?: () => void;
    onOpenChange?: (open: boolean) => void;
}
export declare const ConfirmDialog: ({ children, triggerComponent, title, description, cancelText, cancelAction, confirmText, confirmAction, onOpenChange }: Props) => import("react/jsx-runtime").JSX.Element;
export {};
