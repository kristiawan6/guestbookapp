"use client";

import * as React from "react";
import TextareaAutosize from "react-textarea-autosize";

import { cn } from "@/lib/utils";

const RichTextEditor = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<typeof TextareaAutosize>
>(({ className, ...props }, ref) => {
  return (
    <TextareaAutosize
      className={cn(
        "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
RichTextEditor.displayName = "RichTextEditor";

export { RichTextEditor };