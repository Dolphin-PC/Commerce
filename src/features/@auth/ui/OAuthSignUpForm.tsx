import { addNewUser } from "@/features/user/api/post-user";
import Column from "@/shared/components/atoms/Column";
import { Button } from "@/shared/components/ui/button";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { toast } from "@/shared/components/ui/use-toast";
import { ROUTES } from "@/shared/consts/route.const";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { getAuthUser } from "../api/get-user";
import { OAuthSignUpSchema } from "../model/auth.zod";

export const OAuthSignUpForm = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof OAuthSignUpSchema>>({
    resolver: zodResolver(OAuthSignUpSchema),
    defaultValues: {
      nickname: "",
      isSeller: false,
    },
  });

  const handleSignup = async (data: z.infer<typeof OAuthSignUpSchema>) => {
    const { user } = await getAuthUser();
    if (!user) return;

    try {
      await addNewUser({
        id: user.id,
        email: user.email,
        nickname: data.nickname,
        isseller: data.isSeller,
      });
      toast({ title: "회원가입이 완료되었습니다." });
      navigate(ROUTES.HOME);
    } catch (err) {
      console.error(err);
      toast({ title: "회원가입에 실패했습니다." });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSignup)}>
        <Column className="gap-[20px]">
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
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
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
