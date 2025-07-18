import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { forwardRef } from "react";

interface RadioCardProps {
  value: string;
  label: string;
  checked: boolean;
  onChange: (value: string) => void;
  className?: string;
}

export const RadioCard = forwardRef<HTMLLabelElement, RadioCardProps>(
  ({ value, label, checked, onChange, className }, ref) => {
    return (
      <label ref={ref} className={cn("cursor-pointer", className)}>
        <input
          type="radio"
          value={value}
          checked={checked}
          onChange={() => onChange(value)}
          className="sr-only"
        />
        <div
          className={cn(
            "p-4 border-2 rounded-xl transition-all",
            checked
              ? "border-orange-500 bg-orange-50"
              : "border-gray-200 hover:border-gray-300"
          )}
        >
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                checked ? "border-orange-500" : "border-gray-300"
              )}
            >
              {checked && <Check className="w-3 h-3 text-orange-500" />}
            </div>
            <div>
              <span className="text-sm font-medium text-gray-700">{label}</span>
            </div>
          </div>
        </div>
      </label>
    );
  }
);

RadioCard.displayName = "RadioCard";
