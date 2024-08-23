import { addNewUser } from "@/features/user/api/post-user";
import Column from "@/shared/components/atoms/Column";
import { Button } from "@/shared/components/ui/button";
import { Checkbox } from "@/shared/components/ui/checkbox";
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
import { signup } from "../api/sign-up";
import { SignUpSchema } from "../model/auth.zod";
import { AuthError } from "@supabase/supabase-js";

export const SignUpForm = () => {
  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => setPasswordVisible((prev) => !prev);

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      nickname: "",
      isSeller: false,
    },
  });

  const handleSignup = async (data: z.infer<typeof SignUpSchema>) => {
    try {
      const auth = await signup({
        email: data.email,
        password: data.password,
      });
      if (auth.user === null) throw new Error("회원가입에 실패했습니다.");

      await addNewUser({
        id: auth.user.id,
        email: data.email,
        nickname: data.nickname,
        isseller: data.isSeller,
      });

      toast({
        title: "회원가입이 완료되었습니다.",
        description: "로그인 페이지로 이동합니다.",
      });
      navigate("/sign-in");
    } catch (error) {
      if (error instanceof AuthError) {
        toast({
          title: "회원가입에 실패했습니다.",
          description: error.message,
        });
      } else {
        toast({
          title: "회원가입에 실패했습니다.",
        });
        console.error(error);
      }
    }

    // .catch((err) => {
    //   toast({
    //     title: "회원가입에 실패했습니다.",
    //     description: err,
    //   });
    // });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSignup)}>
        <Column className="gap-[20px]">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email"
                    {...field}
                    autoComplete="username"
                  />
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
                    autoComplete="new-password"
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
                    autoComplete="new-password"
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

          <FormField
            control={form.control}
            name="isSeller"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>판매자로 가입하시겠습니까?</FormLabel>
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
