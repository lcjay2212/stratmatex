import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { checkMinMax, hasMetCases } from "@/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";

const RegisterPage = () => {
  const form = useForm();

  return (
    <div className="text-white">
      <p className="my-4">Register</p>

      <Form {...form}>
        <form>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                    checkMinMax(8, 20, e) ||
                    "Password must be 8-20 characters long",
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
          </div>

          <p className="my-4">Corporation Details</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    <Input
                      type="number"
                      placeholder="Enter El Number"
                      {...field}
                    />
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

          <p className="my-4">Contact Person</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                    <Input
                      type="text"
                      placeholder="Enter First Name"
                      {...field}
                    />
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
                    <Input
                      type="text"
                      placeholder="Enter Last Name"
                      {...field}
                    />
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

          <p className="my-4">Company Address</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

            <FormField
              control={form.control}
              name="state"
              rules={{
                required: "State is required",
              }}
              render={({ field }) => (
                <FormItem className="mt-2">
                  <Label>State</Label>
                  <FormControl>
                    <Input type="text" placeholder="Enter State" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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

          <p className="my-4">Bank Details</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              name="dob"
              rules={{
                required: "Mailing Address is required",
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
                            "w-full justify-start text-left font-normal",
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
                          onSelect={(selectedDate) =>
                            field.onChange(selectedDate)
                          }
                          initialFocus
                          fromYear={1920}
                          toYear={new Date().getFullYear()}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                );
              }}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RegisterPage;
