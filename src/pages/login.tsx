import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useSignIn from "@/hooks/mutations/useSigninMutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import Logo from "../assets/stratmatex-black-logo.svg";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

interface FormData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { signIn, isPending, data } = useSignIn();

  console.log(data);

  const onSubmit: SubmitHandler<FormData> = async (val) => {
    await signIn(val);
  };

  return (
    <div className="min-h-screen bg-black flex">
      {/* Left Sidebar */}
      <div className="w-80 bg-gradient-to-b from-orange-500 to-orange-600 flex flex-col items-center justify-center p-8">
        <div className="text-white text-center">
          <img src={Logo} alt="Logo" className="h-12 w-auto cursor-pointer" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Header */}

          <Card className="bg-gray-black border-none">
            <CardHeader className="text-center">
              <CardTitle className="text-white text-2xl">Sign In</CardTitle>
              <CardDescription className="text-gray-400">
                Access your SMX account to trade strategic materials and manage
                your inventory securely.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="stratmatex@email.com"
                            className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-orange-500 focus:ring-orange-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-start" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Password"
                            className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-orange-500 focus:ring-orange-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-start" />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-lg transition-colors mt-4"
                    loading={isPending}
                  >
                    {isPending ? "Signing In..." : "Sign In"}
                  </Button>

                  <div className="text-center space-y-2">
                    <button
                      type="button"
                      className="text-orange-500 hover:text-orange-400 text-sm bg-transparent border-none cursor-pointer"
                    >
                      Forgot password
                    </button>
                    <div className="text-gray-400 text-sm">
                      Don't have an account?{" "}
                      <button
                        type="button"
                        className="text-orange-500 hover:text-orange-400 bg-transparent border-none cursor-pointer"
                      >
                        Sign up
                      </button>
                    </div>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
