import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

import { playBell } from "@/lib/sounds";

type PendingFaithAlertProps = {
  confirmFaithChange: () => void;
  setPendingFaith: (faith: string) => void;
  pendingFaith: string;
};

export function PendingFaithAlert({
  pendingFaith,
  setPendingFaith,
  confirmFaithChange,
}: PendingFaithAlertProps) {
  return (
    <AlertDialog
      open={!!pendingFaith}
      onOpenChange={() => setPendingFaith(null)}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to change faith?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              playBell();
              confirmFaithChange();
            }}
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
