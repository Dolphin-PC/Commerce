import { signInWithPassword } from "@/entities/auth/sign-in.api";
import { getUserInfo } from "@/entities/user/get-user-info.api";
import Column from "@/shared/components/styles/Column";
import { Button } from "@/shared/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { toast } from "@/shared/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useAuthStore } from "../auth/auth.store";
import { SignInSchema } from "./sign-in.zod";

export const SignInForm = () => {
  const navigate = useNavigate();
  const setSignedIn = useAuthStore((state) => state.setSignedIn);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => setPasswordVisible((prev) => !prev);

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignIn = async (data: z.infer<typeof SignInSchema>) => {
    signInWithPassword({
      email: data.email,
      password: data.password,
    })
      .then((email) => {
        if (!email) throw new Error("로그인에 실패했습니다.");

        getUserInfo(email).then((user) => {
          setSignedIn(user);
          toast({
            title: "로그인이 완료되었습니다.",
          });
          navigate("/");
        });
      })
      .catch((err) => {
        toast({
          title: "로그인에 실패했습니다.",
          description: err,
        });
      });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSignIn)}>
        <Column gap={20}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Password"
                    {...field}
                  />
                </FormControl>
                <button type="button" onClick={togglePasswordVisibility}>
                  <small>{passwordVisible ? "Hide" : "Show"}</small>
                </button>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Sign In</Button>
        </Column>
      </form>
    </Form>
  );
};
