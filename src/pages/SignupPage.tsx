import { SignUpForm } from "@/features/auth/SignUpForm.ui";
import Column from "@/shared/components/styles/Column";
import CenterLayout from "@/shared/components/templates/CenterLayout";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { ROUTES } from "@/shared/consts/route.const";
import { Link } from "react-router-dom";

export const SignupPage = () => {
  return (
    <CenterLayout>
      <Column gap={10} className="items-center">
        <Card className="w-[350px] flex flex-col">
          <CardHeader>
            <CardTitle>회원가입</CardTitle>
          </CardHeader>
          <CardContent>
            <SignUpForm />
          </CardContent>
        </Card>
        <Link to={ROUTES.SIGNIN}>
          <Button variant="outline">로그인</Button>
        </Link>
      </Column>
    </CenterLayout>
  );
};
