"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { useAlertDialog } from "@/hooks/use-alert-dialog";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { AlertDialogContext } from "@/hooks/use-alert-dialog-context";

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const { isOpen, title, description, showDialog, closeDialog } =
    useAlertDialog();

  return (
    <QueryClientProvider client={queryClient}>
      <AlertDialogContext.Provider value={{ showDialog }}>
        {children}
        <Toaster />
        <AlertDialog
          isOpen={isOpen}
          onClose={closeDialog}
          title={title}
          description={description}
        />
      </AlertDialogContext.Provider>
    </QueryClientProvider>
  );
}