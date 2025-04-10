import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import * as React from "react";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);
  const inputType =
    type === "password" && isPasswordVisible ? "text" : "password";

  return (
    <div className="relative">
      <input
        type={type === "password" ? inputType : type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-[#4D4D6B] flex h-9 w-full min-w-0 rounded-xl border bg-[#10101F] px-4 py-6 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-[#10101F] file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-md",
          "focus-visible:border-primary focus-visible:ring-primary/50 focus-visible:ring-[2px] focus-visible:bg-black",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
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
