import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { LoaderCircleIcon } from "lucide-react";
import type { ReactNode } from "react";
import { toast } from "sonner";

interface IProps {
  children: ReactNode;
  onClick: () => Promise<any>;
  isLoading: boolean;
}

export function DeleteConfirmation({
  children,
  onClick,
  isLoading = false,
}: IProps) {
  const handleContinue = async () => {
    const toastId = toast.loading("Deleting...");

    try {
      const res = await onClick();
      if (res.success) {
        toast.success("Deleted!", { id: toastId });
      }
    } catch (error: any) {
      toast.error(error?.data?.message || error?.message, { id: toastId });
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger disabled={isLoading} asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="w-[89px]" onClick={handleContinue}>
            {isLoading ? (
              <LoaderCircleIcon
                className="-ms-1 animate-spin"
                size={16}
                aria-hidden="true"
              />
            ) : (
              "Confirm"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
