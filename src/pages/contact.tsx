import SuccessDialog from "@/components/SuccessDialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import BlackCheck from "../assets/icons/black-check.png";
import Gold from "../assets/images/gold.jpg";

interface FormData {
  name: string;
  message: string;
  email: string;
  subject: string;
}

const ContactPage = () => {
  const [visible, setVisible] = useState(false);
  const form = useForm<FormData>();

  const { mutate, isPending } = useMutation({
    mutationFn: (variable: FormData) =>
      axios.post(
        `${import.meta.env.VITE_PUBLIC_API_BASE_URL}/web/contact-us`,
        variable,
        {
          headers: {
            Version: 2,
          },
        }
      ),
    onSuccess: () => {
      // toast.success(`Inquiry has been submitted!`);
      setVisible(true);
    },
    onError: (error) => {
      const response = (
        error as unknown as {
          response?: { data?: { errors?: Record<string, string> } };
        }
      )?.response;
      if (response?.data?.errors) {
        // errorMessage(response.data.errors);
        console.log(response?.data?.errors);
      }
    },
  });

  const onSubmit: SubmitHandler<FormData> = (val) => {
    mutate(val);
  };
  return (
    <div className="mt-32 md:mt-48">
      {visible && (
        <SuccessDialog
          setVisible={setVisible}
          visible={visible}
          type="contact"
        />
      )}
      <div className="flex flex-col md:flex-row justify-evenly max-w-screen-xl mx-auto mt-[5rem] p-4 md:p-0">
        <div className="text-start">
          <p className="text-primary text-[18px]">Need Help?</p>
          <div className="my-6">
            <p className="text-[32px] font-bold mb-4">Contact Us</p>
            <p>You can send us real mail here:</p>
          </div>
          <div>
            <p className="text-[32px] font-bold mb-2">
              Strategic Material Exchange™
            </p>
            <p>9107 Yale Rd.</p>
            <p>Diamond, OH 44412</p>
            <p>info@quxnow.com</p>
            <p>(877)-700-0789</p>
          </div>
          <div className="my-8 flex flex-col gap-2">
            <p>Or email us directly at: Info@quxnow.com</p>
            <p>Or call us at 1 (877)-700-0789</p>
            <p>Or simply fill out the form:</p>
          </div>
        </div>
        <div className="w-full md:w-[350px] text-start">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                rules={{
                  required: "Name is required",
                }}
                render={({ field }) => (
                  <FormItem className="mt-2">
                    <Label>Your Name</Label>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                rules={{
                  required: "Email is required",
                }}
                render={({ field }) => (
                  <FormItem className="mt-2">
                    <Label>Your Email</Label>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your Email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subject"
                rules={{
                  required: "Subject is required",
                }}
                render={({ field }) => (
                  <FormItem className="mt-2">
                    <Label>Subject</Label>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your Subject"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                rules={{
                  required: "Message is required",
                }}
                render={({ field }) => (
                  <FormItem className="mt-2">
                    <Label>Your Message</Label>
                    <FormControl>
                      <Textarea
                        placeholder="Enter your Message.."
                        className="h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="rounded-full my-4 bg-white text-black visible-focus:bg-primary hover:text-white cursor-pointer h-auto text-xl p-1"
                loading={isPending}
              >
                <span className="ml-6 mr-4">Submit</span>
                <span>
                  <img src={BlackCheck} className="h-[40px]" />
                </span>
              </Button>
            </form>
          </Form>
        </div>

        {/* <div /> */}
      </div>

      <Separator className="bg-gray-500 my-12 max-w-screen-xl mx-auto" />

      <div className="bg-primary text-start py-[3rem] px-4 md:px-0">
        <div className="flex flex-col md:flex-row max-w-screen-xl mx-auto justify-evenly gap-12 md:gap-0">
          <div className="text-lg/8 font-semibold">
            <p className="text-[32px] font-bold mb-8">
              Strategic Material Exchange™
            </p>
            <p>9107 Yale Rd.</p>
            <p>Diamond, OH 44412</p>
            <p>info@quxnow.com</p>
            <p>(877)-700-0789</p>
          </div>
          <div className="text-lg/8 font-semibold">
            <p className="text-[32px] font-bold mb-8">Business Hours</p>
            <p>9am - 7pm</p>
            <p>Monday to Friday</p>
          </div>
        </div>
      </div>

      <img src={Gold} />
    </div>
  );
};

export default ContactPage;
