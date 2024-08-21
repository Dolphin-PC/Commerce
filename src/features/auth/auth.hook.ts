import { supabase } from "@/entities/@db/supabase.config";
import { getUserInfo } from "@/entities/user/get-user-info.api";
import { useEffect } from "react";
import { useAuthStore } from "./auth.store";

export const useAuth = (): void => {
  const setSignedIn = useAuthStore((state) => state.setSignedIn);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) return setSignedIn(null);

      const { email } = data.user;
      if (email === undefined) return setSignedIn(null);

      const user = await getUserInfo(email);
      setSignedIn(user);
    })();
  }, [setSignedIn]);
};
