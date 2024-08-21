import { SignInForm } from "@/features/sign-in/SignInForm.ui";
import CenterLayout from "@/shared/components/templates/CenterLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

export const SignInPage = () => {
  return (
    <CenterLayout>
      <Card className="w-[350px] flex flex-col">
        <CardHeader>
          <CardTitle>로그인</CardTitle>
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>
      </Card>
    </CenterLayout>
  );
};
