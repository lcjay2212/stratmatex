import SearchInput from "@/components/SearchInput";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

export const StepThree = () => {
  const form = useFormContext();

  const { data } = useQuery({
    queryKey: ["banks"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_PUBLIC_API_BASE_URL}/web/banks/list`
      );

      return data.data;
    },
    refetchOnWindowFocus: false,
  });

  const bankList = data?.map((bank: { name: string }) => {
    return {
      value: bank.name,
      label: bank.name,
    };
  });

  const inputPassportRef = useRef<HTMLInputElement>(null);
  const [passportName, setPassportName] = useState("");

  const inputDriverRef = useRef<HTMLInputElement>(null);
  const [driverName, setDriverName] = useState("");

  return (
    <>
      <div className="grid grid-cols-1 gap-2 w-full md:w-[400px]">
        <FormField
          control={form.control}
          name="account_name"
          rules={{
            required: "Bank Account Nickname is required",
          }}
          render={({ field }) => (
            <FormItem className="mt-2">
              <Label>Bank Account Nickname</Label>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Create Bank Account Nickname"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SearchInput name="bank_name" label="Bank Name" data={bankList} />

        <FormField
          control={form.control}
          name="account_number"
          rules={{
            required: "Bank Account Number is required",
          }}
          render={({ field }) => (
            <FormItem className="mt-2">
              <Label>Bank Account Number</Label>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter Account Number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="routing_number"
          rules={{
            required: "Bank Routing Number is required",
          }}
          render={({ field }) => (
            <FormItem className="mt-2">
              <Label>Bank Routing Number</Label>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter Routing Number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ssn"
          rules={{
            required: "Social Security Number is required",
          }}
          render={({ field }) => (
            <FormItem className="mt-2">
              <Label>Social Security Number</Label>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter SSN e.g. 123-45-6789"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dob"
          rules={{
            required: "Date of birth is required",
          }}
          render={({ field }) => {
            return (
              <FormItem className="mt-2">
                <Label>Date of Birth</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal bg-[#10101F] border-[#4D4D6B] px-4 py-6 rounded-xl",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      captionLayout="dropdown-buttons"
                      selected={field.value}
                      onSelect={(selectedDate) => field.onChange(selectedDate)}
                      initialFocus
                      fromYear={1920}
                      toYear={new Date().getFullYear()}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      </div>

      <p className="mt-8 mb-2 font-bold text-[24px]">Upload Document</p>
      <div className="grid grid-cols-1 gap-2 w-full md:w-[400px]">
        <FormField
          control={form.control}
          name="passport"
          rules={{
            required: "Passport is required",
          }}
          render={({ field }) => {
            const handleClick = () => {
              inputPassportRef.current?.click();
            };

            const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
              const file = e.target.files?.[0];
              if (file) {
                setPassportName(file.name);
                // Important: use field.onChange to update react-hook-form value
                field.onChange(file);
              }
            };

            return (
              <FormItem className="mt-2">
                <Label>Passport or Second Form of ID</Label>
                <FormControl>
                  <div key="Passport">
                    <input
                      ref={(el) => {
                        inputPassportRef.current = el;
                        field.ref(el); // make sure ref is passed correctly
                      }}
                      type="file"
                      onChange={handleChange}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      className="w-full"
                      onClick={handleClick}
                    >
                      Upload File
                    </Button>
                    {passportName && (
                      <p className="text-sm text-muted-foreground">
                        Selected: {passportName}
                      </p>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="driver_license"
          rules={{
            required: "Driver License is required",
          }}
          render={({ field }) => {
            const handleClick = () => {
              inputDriverRef.current?.click();
            };

            const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
              const file = e.target.files?.[0];
              if (file) {
                setDriverName(file.name);
                // Important: use field.onChange to update react-hook-form value
                field.onChange(file);
              }
            };

            return (
              <FormItem className="mt-2">
                <Label>Driver License</Label>
                <FormControl>
                  <div key="Driver License">
                    <input
                      ref={(el) => {
                        inputDriverRef.current = el;
                        field.ref(el); // make sure ref is passed correctly
                      }}
                      type="file"
                      onChange={handleChange}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      className="w-full"
                      onClick={handleClick}
                    >
                      Upload File
                    </Button>
                    {driverName && (
                      <p className="text-sm text-muted-foreground">
                        Selected: {driverName}
                      </p>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      </div>
    </>
  );
};
