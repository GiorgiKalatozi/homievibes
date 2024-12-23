import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignUpValidation } from "@/lib/validation";
import { z } from "zod";
import { Link } from "react-router-dom";
import Loader from "@/components/shared/loader";
import { createUserAccount } from "@/lib/services/api";

export default function SignUpForm() {
  const isLoading = false;
  // const { toast } = useToast();
  // const navigate = useNavigate();
  // const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const handleSignup = async (user: z.infer<typeof SignUpValidation>) => {
    try {
      const newUser = await createUserAccount(user);
      console.log(newUser);
      // if (!newUser) {
      //   toast({ title: "Sign up failed. Please try again." });
      //   return;
      // }
      // const session = await signInAccount({
      //   email: user.email,
      //   password: user.password,
      // });
      // if (!session) {
      //   toast({ title: "Something went wrong. Please login your new account" });
      //   navigate("/sign-in");
      //   return;
      // }
      // const isLoggedIn = await checkAuthUser();
      // if (isLoggedIn) {
      //   form.reset();
      //   navigate("/");
      // } else {
      //   toast({ title: "Login failed. Please try again." });
      //   return;
      // }
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <div className="flex items-center">
          <img src="/assets/images/logo.svg" alt="logo" className="w-10 h-10" />
          <h1 className="text-2xl font-inter "> homievibes </h1>
        </div>

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Create a new account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          To use homievibes, Please enter your details
        </p>

        <form
          onSubmit={form.handleSubmit(handleSignup)}
          className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage className="text-rose-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage className="text-rose-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Email</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage className="text-rose-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage className="text-rose-500" />
              </FormItem>
            )}
          />

          <Button type="submit" className="shad-button_primary">
            {/* {isCreatingAccount || isSigningInUser || isUserLoading ? ( */}
            {isLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading... Loading...
              </div>
            ) : (
              "Sign Up"
            )}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account?
            <Link
              to="/sign-in"
              className="text-primary-500 text-small-semibold ml-1">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
}
