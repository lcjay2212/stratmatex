import SearchInput from "@/components/SearchInput";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useFormContext } from "react-hook-form";

export const StepTwo = () => {
  const form = useFormContext();

  const { data: state } = useQuery({
    queryKey: ["states"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_PUBLIC_API_BASE_URL}/web/states`
      );

      const state = data.data.map((state: { name: string; value: string }) => {
        return {
          value: state.value,
          label: state.name,
        };
      });

      return state;
    },
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <div className="grid grid-cols-1  gap-2 w-full md:w-[400px] mt-8">
        <FormField
          control={form.control}
          name="el_number"
          rules={{
            required: "El Number is required",
          }}
          render={({ field }) => (
            <FormItem className="mt-2">
              <Label>El Number</Label>
              <FormControl>
                <Input type="number" placeholder="Enter El Number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="corporation_name"
          rules={{
            required: "Corporation Name is required",
          }}
          render={({ field }) => (
            <FormItem className="mt-2">
              <Label>Corporation Name</Label>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter Corporation Name"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="business_license"
          rules={{
            required: "Password Confirmation is required",
          }}
          render={({ field }) => (
            <FormItem className="mt-2">
              <Label>Business License</Label>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter Business License"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <p className="mt-8 mb-2 font-bold text-[24px]">Contact Person</p>
      <div className="grid grid-cols-1  gap-2 w-full md:w-[400px] mt-4">
        <FormField
          control={form.control}
          name="contact_person_firstname"
          rules={{
            required: "Contact First Name is required",
          }}
          render={({ field }) => (
            <FormItem className="mt-2">
              <Label>First Name</Label>
              <FormControl>
                <Input type="text" placeholder="Enter First Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contact_person_lastname"
          rules={{
            required: "Contact Last Name is required",
          }}
          render={({ field }) => (
            <FormItem className="mt-2">
              <Label>Last Name</Label>
              <FormControl>
                <Input type="text" placeholder="Enter Last Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contact_person_phone"
          rules={{
            required: "Contact  Phone Number is required",
          }}
          render={({ field }) => (
            <FormItem className="mt-2">
              <Label>Phone Number</Label>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter Phone e.g. 505-555-5555"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contact_person_email"
          rules={{
            required: "Contact Email is required",
          }}
          render={({ field }) => (
            <FormItem className="mt-2">
              <Label>Email</Label>
              <FormControl>
                <Input type="text" placeholder="Enter Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <p className="mt-8 mb-2 font-bold text-[24px]">Company Address</p>
      <div className="grid grid-cols-1  gap-2 w-full md:w-[400px] mt-4">
        <FormField
          control={form.control}
          name="mailing_address"
          rules={{
            required: "Mailing Address is required",
          }}
          render={({ field }) => (
            <FormItem className="mt-2">
              <Label>Mailing Address</Label>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter Address e.g. 123 Street Ave"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address_2"
          render={({ field }) => (
            <FormItem className="mt-2">
              <Label>Address 2</Label>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter Address e.g. Suite, Apt"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          rules={{
            required: "City is required",
          }}
          render={({ field }) => (
            <FormItem className="mt-2">
              <Label>City</Label>
              <FormControl>
                <Input type="text" placeholder="Enter City" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SearchInput name="state" label="State" data={state} />

        <FormField
          control={form.control}
          name="zip"
          rules={{
            required: "Zip is required",
          }}
          render={({ field }) => (
            <FormItem className="mt-2">
              <Label>Zip</Label>
              <FormControl>
                <Input type="text" placeholder="Enter Zip" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};
