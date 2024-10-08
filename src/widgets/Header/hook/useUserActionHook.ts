import { signOut } from "@/features/@auth/api/sign-out";
import { useAuthStore } from "@/features/@auth/store/auth.store";
import { toast } from "@/shared/components/ui/use-toast";

interface Return {
  handleSignOut: () => void;
}

export const useUserActionHook = (): Return => {
  const setSignedIn = useAuthStore((state) => state.setSignedIn);

  const handleSignOut = () => {
    signOut().then(() => {
      setSignedIn(null);
      toast({
        title: "로그아웃 되었습니다.",
      });
    });
  };

  return { handleSignOut };
};
