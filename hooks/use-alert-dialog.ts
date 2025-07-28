import { useState } from "react";

export function useAlertDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const showDialog = (newTitle: string, newDescription: string) => {
    setTitle(newTitle);
    setDescription(newDescription);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    title,
    description,
    showDialog,
    closeDialog,
  };
}