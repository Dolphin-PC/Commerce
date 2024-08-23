import { getUserInfo } from "@/features/user/api/get-user";
import { supabase } from "@/shared/config/@db/supabase.config";
import { useEffect } from "react";
import { useAuthStore } from "../store/auth.store";

export const useAutoAuth = (): void => {
  const setSignedIn = useAuthStore((state) => state.setSignedIn);

  useEffect(() => {
    const handleSignIn = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) return setSignedIn(null);

      const { id } = data.user;
      if (id === undefined) return setSignedIn(null);

      const userInfo = await getUserInfo({id});
      setSignedIn(userInfo);
    };

    handleSignIn();
  }, [setSignedIn]);
};
