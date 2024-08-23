import { supabase } from "@/entities/@db/supabase.config";
import { getUserInfo } from "@/features/user/api/get-user";
import { useEffect } from "react";
import { useAuthStore } from "../store/auth.store";

export const useAutoAuth = (): void => {
  const setSignedIn = useAuthStore((state) => state.setSignedIn);

  useEffect(() => {
    const handleSignIn = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) return setSignedIn(null);

      const { email } = data.user;
      if (email === undefined) return setSignedIn(null);

      const {data:userInfo} = await getUserInfo({email});
      setSignedIn(userInfo);
    };

    handleSignIn();
  }, [setSignedIn]);
};
