import { signInOAuth } from "@/features/@auth/api/sign-in-oauth";
import { GoogleLoginButton } from "@/features/@auth/ui/OAuthButton";
import { SignInForm } from "@/features/@auth/ui/SignInForm";
import Column from "@/shared/components/atoms/Column";
import CenterLayout from "@/shared/components/templates/CenterLayout";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { ROUTES } from "@/shared/consts/route.const";
import { Link } from "react-router-dom";

const _SignInPage = () => {
  return (
    <Column className="items-center gap-[10px]">
      <Card className="w-[350px] flex flex-col">
        <CardHeader>
          <CardTitle>로그인</CardTitle>
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>
        <CardFooter>
          <GoogleLoginButton onClick={() => signInOAuth({ provider: "google" })} />
        </CardFooter>
      </Card>
      <Link to={ROUTES.SIGNUP}>
        <Button variant="outline">회원가입</Button>
      </Link>
    </Column>
  );
};

export default function SignInPage() {
  return (
    <CenterLayout>
      <_SignInPage />
    </CenterLayout>
  );
}
