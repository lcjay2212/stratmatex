import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import * as React from "react";

// Add a variant prop for light or dark mode
interface InputProps extends React.ComponentProps<"input"> {
  variant?: "light" | "dark";
}

function Input({ className, type, variant = "dark", ...props }: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);
  const inputType =
    type === "password" && isPasswordVisible ? "text" : "password";

  // Define base and variant-specific classes
  const baseClasses =
    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-xl border px-4 py-6 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-md focus-visible:border-primary focus-visible:ring-primary/50 focus-visible:ring-[2px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive";
  const darkClasses =
    "border-[#4D4D6B] bg-[#10101F] file:bg-[#10101F] dark:bg-input/30";
  const lightClasses = "border-gray-300 bg-white file:bg-white";

  return (
    <div className="relative">
      <input
        type={type === "password" ? inputType : type}
        data-slot="input"
        className={cn(
          baseClasses,
          variant === "dark" ? darkClasses : lightClasses,
          className
        )}
        {...props}
      />

      {type === "password" && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
        >
          {isPasswordVisible ? (
            <EyeOff className="h-5 w-5 text-gray-500" />
          ) : (
            <Eye className="h-5 w-5 text-gray-500" />
          )}
        </button>
      )}
    </div>
  );
}

export { Input };
