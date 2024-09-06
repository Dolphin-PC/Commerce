import { Button } from "@/shared/components/ui/button";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
  return (
    <Button size={"icon"} variant={"outline"}>
      <LogOut />
    </Button>
  );
};

export default LogoutButton;
