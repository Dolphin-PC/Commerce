import Column from "@/shared/ui/templates/Column";
import { Button } from "@/shared/ui/ui/button";
import { Input } from "@/shared/ui/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SignUpSchema } from "./sign-up.zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/ui/form";
import { signup } from "@/entities/user";
import { useState } from "react";
import { toast } from "@/shared/ui/ui/use-toast";
import { useNavigate } from "react-router-dom";

export const SignUpForm = () => {
  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => setPasswordVisible((prev) => !prev);

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      nickname: "",
    },
  });

  const handleSignup = async (data: z.infer<typeof SignUpSchema>) => {
    signup({
      email: data.email,
      password: data.password,
      nickname: data.nickname,
    })
      .then(() => {
        toast({
          title: "회원가입이 완료되었습니다.",
          description: "로그인 페이지로 이동합니다.",
        });
        navigate("/sign-in");
      })
      .catch((err) => {
        toast({
          title: "회원가입에 실패했습니다.",
          description: err,
        });
      });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSignup)}>
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

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
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
            name="nickname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nickname</FormLabel>
                <FormControl>
                  <Input placeholder="Nickname" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Sign Up</Button>
        </Column>
      </form>
    </Form>
  );
};
