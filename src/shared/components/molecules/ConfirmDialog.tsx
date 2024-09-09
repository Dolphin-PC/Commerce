import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "../ui/alert-dialog";

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

export const ConfirmDialog = ({ children, triggerComponent, title, description, cancelText, cancelAction = () => {}, confirmText = "확인", confirmAction = () => {}, onOpenChange }: Props) => {
  return (
    <AlertDialog onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>{triggerComponent}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
          {children && children}
        </AlertDialogHeader>

        <AlertDialogFooter>
          {cancelText && <AlertDialogCancel onClick={cancelAction}>{cancelText}</AlertDialogCancel>}
          <AlertDialogAction onClick={confirmAction}>{confirmText}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
