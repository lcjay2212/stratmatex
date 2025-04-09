import { Check, ChevronsUpDown } from "lucide-react";
import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { FormField, FormItem, FormMessage } from "../ui/form";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const SearchInput: FC<{
  label: string;
  name: string;
  data: { value: string; label: string }[];
}> = ({ label, name, data }) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      rules={{
        required: `${label} is required`,
      }}
      render={({ field }) => (
        <FormItem className="mt-2">
          <Label>{label}</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={field.value ? "true" : "false"}
                className="w-full justify-between"
              >
                {field.value
                  ? data.find((item) => item.value === field.value)?.label
                  : `Select a ${label}...`}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder={`Search ${label}...`} />
                <CommandList>
                  <CommandEmpty>No {label} found.</CommandEmpty>
                  <CommandGroup>
                    {data?.map((item) => (
                      <CommandItem
                        key={item.value}
                        value={item.value}
                        onSelect={(currentValue) => {
                          field.onChange(
                            currentValue === field.value ? "" : currentValue
                          );
                        }}
                      >
                        {item.label}
                        <Check
                          className={`ml-auto ${
                            field.value === item.value
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SearchInput;
