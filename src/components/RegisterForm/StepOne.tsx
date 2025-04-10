import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { checkMinMax, hasMetCases } from "@/utils";
import { useFormContext } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";

export const StepOne = () => {
  const form = useFormContext();

  return (
    <div className="grid grid-cols-1 gap-2 w-full md:w-[400px]">
      <FormField
        control={form.control}
        name="email"
        rules={{
          required: "Email is required",
        }}
        render={({ field }) => (
          <FormItem className="mt-2">
            <Label>Email</Label>
            <FormControl>
              <Input type="email" placeholder="Email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="username"
        rules={{
          required: "Username is required",
        }}
        render={({ field }) => (
          <FormItem className="mt-2">
            <Label>Username</Label>
            <FormControl>
              <Input type="text" placeholder="Username" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="password"
        rules={{
          required: "Password is required",
          validate: {
            checkMinMax: (e): string | boolean =>
              checkMinMax(8, 20, e) || "Password must be 8-20 characters long",
            hasMetCase: (e): string | boolean =>
              hasMetCases(e, 3) ||
              "Password must contain symbols from at least three of the following four categories: lowercase letters, uppercase letters, numerical digits (0-9) and special characters (!,@,#,$,%,&,*,(,))",
          },
        }}
        render={({ field }) => (
          <FormItem className="mt-2">
            <Label>Password</Label>
            <FormControl>
              <Input type="password" placeholder="Password" {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="password_confirmation"
        rules={{
          required: "Password Confirmation is required",
          validate: {
            passwordsMatch: (e): boolean | string =>
              e === form.getValues().password || "Passwords Must Match",
          },
        }}
        render={({ field }) => (
          <FormItem className="mt-2">
            <Label>Confirm Password</Label>
            <FormControl>
              <Input
                type="password"
                placeholder="Confirm Password"
                {...field}
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="term_and_condition"
        rules={{
          required: "Please agree to the terms and conditions",
        }}
        render={({ field }) => (
          <FormItem className="mt-2">
            <FormControl>
              <div className="flex mt-4">
                <Checkbox
                  id="term-and-condition"
                  onCheckedChange={(checked) => field.onChange(checked)}
                />
                <Label>
                  I agree to the
                  <a
                    href="https://qux.tv/terms-and-condition"
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary"
                  >
                    Terms and Conditions
                  </a>
                </Label>
              </div>
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default StepOne;
