import GoogleIcon from "@/shared/assets/icons/google.svg?react";
import { Button } from "@/shared/components/ui/button";

interface Props {
  onClick: () => void;
}

export { GoogleLoginButton };

const GoogleLoginButton = ({ onClick }: Props) => {
  return (
    <Button variant="outline" className="flex items-center w-full gap-[5px] pl-0 pr-3" onClick={onClick}>
      <GoogleIcon />
      <span>Google로 로그인</span>
    </Button>
  );
};
