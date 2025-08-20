"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { useAlertDialog } from "@/hooks/use-alert-dialog";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { AlertDialogContext } from "@/hooks/use-alert-dialog-context";
import { createOptimizedQueryClient } from "@/lib/react-query-config";

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => createOptimizedQueryClient());
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
        {/* React Query Devtools can be added by installing @tanstack/react-query-devtools */}
      </AlertDialogContext.Provider>
    </QueryClientProvider>
  );
}