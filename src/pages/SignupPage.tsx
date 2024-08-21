import { SignUpForm } from "@/features/sign-up/SignUpForm.ui";
import CenterLayout from "@/shared/components/templates/CenterLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

export const SignupPage = () => {
  return (
    <CenterLayout>
      <Card className="w-[350px] flex flex-col">
        <CardHeader>
          <CardTitle>회원가입</CardTitle>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
      </Card>
    </CenterLayout>
  );
};
