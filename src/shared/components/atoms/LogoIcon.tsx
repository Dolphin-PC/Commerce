import { Link } from "react-router-dom";
import { Banana } from "lucide-react";
import { ROUTES } from "@/app/routers";
import { Card } from "../ui/card";

const LogoIcon = () => {
  return (
    <Link to={ROUTES.HOME}>
      <Card className="p-4 bg-yellow-200">
        <Banana />
      </Card>
    </Link>
  );
};

export default LogoIcon;
