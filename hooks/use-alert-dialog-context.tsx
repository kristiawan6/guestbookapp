import { createContext, useContext } from "react";

interface AlertDialogContextType {
  showDialog: (title: string, description: string) => void;
}

export const AlertDialogContext = createContext<AlertDialogContextType | undefined>(
  undefined
);

export function useAlertDialogContext() {
  const context = useContext(AlertDialogContext);
  if (!context) {
    throw new Error(
      "useAlertDialogContext must be used within an AlertDialogProvider"
    );
  }
  return context;
}