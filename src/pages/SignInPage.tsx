import { SignInForm } from "@/features/auth/SignInForm.ui";
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

export const SignInPage = () => {
  return (
    <CenterLayout>
      <Column gap={10} className="items-center">
        <Card className="w-[350px] flex flex-col">
          <CardHeader>
            <CardTitle>로그인</CardTitle>
          </CardHeader>
          <CardContent>
            <SignInForm />
          </CardContent>
        </Card>
        <Link to={ROUTES.SIGNUP}>
          <Button variant="outline">회원가입</Button>
        </Link>
      </Column>
    </CenterLayout>
  );
};
