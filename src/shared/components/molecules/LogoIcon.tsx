import { ROUTES } from "@/shared/consts/route.const";
import { Banana } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const LogoIcon = () => {
  return (
    <Button className="w-16 h-16 bg-yellow-400" asChild>
      <Link to={ROUTES.HOME}>
        <Banana />
      </Link>
    </Button>
  );
};

export default LogoIcon;
