import { getUserInfo } from "@/features/user/api/get-user";
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
import { signInWithPassword } from "../api/sign-in";
import { SignInSchema } from "../model/auth.zod";
import { useAuthStore } from "../store/auth.store";

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
    try {
      const user = await signInWithPassword({
        email: data.email,
        password: data.password,
      });

      const userInfo = await getUserInfo({ id: user.id });
      if (userInfo === null) throw new Error("사용자를 찾을 수 없습니다.");

      setSignedIn(userInfo);
      toast({
        title: "로그인이 완료되었습니다.",
      });
      if (userInfo.isseller) {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "로그인에 실패했습니다.",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSignIn)}>
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
                    autoComplete="current-password"
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
