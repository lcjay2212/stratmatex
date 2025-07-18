import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { RadioCard } from "@/components/ui/radio-card";
import { Info } from "lucide-react";
import { Control } from "react-hook-form";
import { SellMaterialsFormValues } from "../types";

interface PurchaseTypeFieldProps {
  control: Control<SellMaterialsFormValues>;
}

const purchaseTypeOptions = [
  { value: "bid", label: "Open for bids" },
  { value: "fixed_price", label: "Fixed Price" },
] as const;

export const PurchaseTypeField = ({ control }: PurchaseTypeFieldProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">
          Purchase Type
        </label>
        <Info className="h-4 w-4 text-gray-400" />
      </div>
      <FormField
        control={control}
        name="purchase_type"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="flex gap-4">
                {purchaseTypeOptions.map((option) => (
                  <RadioCard
                    key={option.value}
                    value={option.value}
                    label={option.label}
                    checked={field.value === option.value}
                    onChange={field.onChange}
                  />
                ))}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
