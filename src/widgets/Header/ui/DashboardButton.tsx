import { Button } from "@/shared/components/ui/button";
import { ROUTES } from "@/shared/consts/route.const";
import { Store } from "lucide-react";
import { Link } from "react-router-dom";

const DashboardButton = () => {
  return (
    <Button variant="outline" size="icon" asChild>
      <Link to={ROUTES.DASHBOARD}>
        <Store />
      </Link>
    </Button>
  );
};

export default DashboardButton;
