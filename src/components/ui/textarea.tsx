import * as React from "react";

import { cn } from "@/lib/utils";

// Add a variant prop for light or dark mode
interface TextareaProps extends React.ComponentProps<"textarea"> {
  variant?: "light" | "dark";
}

function Textarea({ className, variant = "dark", ...props }: TextareaProps) {
  const baseClasses =
    "placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex field-sizing-content min-h-16 w-full rounded-md border px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm";
  const darkClasses =
    "border-[#4D4D6B] bg-[#10101F] dark:bg-input/30 focus-visible:bg-black";
  // For light, ensure focus/active background stays light
  const lightClasses = "border-gray-300 bg-white focus-visible:bg-white";

  return (
    <textarea
      data-slot="textarea"
      className={cn(
        baseClasses,
        variant === "dark" ? darkClasses : lightClasses,
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
