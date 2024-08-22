import { ROUTES } from "@/shared/consts/route.const";
import { Banana } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "../ui/card";

const LogoIcon = () => {
  return (
    <Card className="p-4 bg-yellow-200">
      <Link to={ROUTES.HOME}>
        <Banana />
      </Link>
    </Card>
  );
};

export default LogoIcon;
