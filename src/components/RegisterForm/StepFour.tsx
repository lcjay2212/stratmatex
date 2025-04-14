import { checkMinMax } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useFormContext } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

export const StepFour = () => {
  const form = useFormContext();
  console.log(form.watch("other_mats"));

  const { data } = useQuery({
    queryKey: ["materials"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_PUBLIC_API_BASE_URL}/web/material-list`,
        {
          headers: {
            Version: 2,
          },
        }
      );

      return data.data;
    },
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <div className="grid grid-cols-1 gap-2 w-full md:w-[400px]">
        <p className="text-lg md:text-[21px]/6 mb-8">
          Select the materials your organization regularly requires:
        </p>

        <FormField
          control={form.control}
          name="materials"
          rules={{
            required: "Materials are required",
          }}
          render={({ field: { onChange, value } }) => {
            const selectedValues = Array.isArray(value) ? value : [];
            const handleCheckboxChange = (checked: boolean, item: string) => {
              if (checked) {
                onChange([...selectedValues, item]);
              } else {
                onChange(selectedValues.filter((v) => v !== item));
              }
            };

            return (
              <>
                {data?.materials.map((item: string) => (
                  <FormItem
                    key={item}
                    className="flex flex-row items-start space-x-3 space-y-0 mt-2"
                  >
                    <FormControl>
                      <Checkbox
                        name={item}
                        checked={selectedValues.includes(item)}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange(!!checked, item)
                        }
                        className="ml-4 mr-1"
                      />
                    </FormControl>
                    <FormLabel className="font-normal m-0">{item}</FormLabel>
                    <FormMessage />
                  </FormItem>
                ))}
              </>
            );
          }}
        />

        <FormField
          control={form.control}
          name="other_mats"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(checked)}
                  className="ml-4 mr-1"
                />
              </FormControl>
              <FormLabel className="font-normal m-0">
                Other materials (please specify below)
              </FormLabel>
            </FormItem>
          )}
        />

        {form.watch("other_mats") && (
          <FormField
            control={form.control}
            name="additional_materials"
            render={({ field }) => {
              return (
                <FormItem className="space-x-3 space-y-0 mt-8">
                  <FormLabel>Additional materials needed:</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Enter other materials here"
                      className="h-[200px] rounded-xl p-4 mt-2"
                    />
                  </FormControl>
                </FormItem>
              );
            }}
          />
        )}

        <FormField
          control={form.control}
          name="specifications"
          render={({ field }) => {
            return (
              <FormItem className="space-x-3 space-y-0 mt-8">
                <FormLabel>Typical specifications required:</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Enter specifications here"
                    className="h-[200px] rounded-xl p-4 mt-2"
                  />
                </FormControl>
              </FormItem>
            );
          }}
        />

        <p className="mt-8 mx-4 font-semibold">
          Access to restricted materials requires additional verification:
        </p>

        <div className="flex justify-evenly gap-4">
          <ul className="list-disc">
            <li>Uranium</li>
            <li>Thorium</li>
          </ul>
          <ul className="list-disc">
            <li>Plutonium</li>
            <li>Lithium</li>
          </ul>
        </div>

        <p className="mt-8 mx-4 font-semibold">
          To complete Level 2 Registration, please provide:
        </p>

        <FormField
          control={form.control}
          name="cage_code"
          rules={{
            required: "CAGE Code is required",
            validate: {
              checkMinMax: (e): string | boolean =>
                checkMinMax(0, 5, e) || "CAGE Code 5 characters long",
            },
          }}
          render={({ field }) => (
            <FormItem className="mt-2">
              <Label>CAGE Number</Label>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter CAGE Number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="duns"
          rules={{
            required: "DUNS Number is required",
            validate: {
              checkMinMax: (e): string | boolean =>
                checkMinMax(0, 9, e) || "DUNS Number 9 characters long",
            },
          }}
          render={({ field }) => (
            <FormItem className="mt-2">
              <Label>DUNS Number</Label>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter DUNS Number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <p className="mt-8 text-center text-[20px]">
          This information is required by federal regulations for controlled
          materials. Verification typically takes 24-48 hours.
        </p>
      </div>
    </>
  );
};
