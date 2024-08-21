import { SignUpForm } from "@/features/user";
import CenterLayout from "@/shared/ui/templates/CenterLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/ui/card";

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
