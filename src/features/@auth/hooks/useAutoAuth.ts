import { getUserInfo } from "@/features/user/api/get-user";
import { ROUTES } from "@/shared/consts/route.const";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthUser } from "../api/get-user";
import { useAuthStore } from "../store/auth.store";

export const useAutoAuth = (): void => {
  const navigate = useNavigate();
  const setSignedIn = useAuthStore((state) => state.setSignedIn);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const handleSignIn = async () => {
      // 인증 정보 조회
      const auth = await getAuthUser();
      if (!auth.user) return setSignedIn(null);

      // DB에 저장된 사용자 정보 조회
      const userInfo = await getUserInfo({ id: auth.user.id });

      // 인증에 있는데, DB에 없는 경우 => SignupOAuthPage로 이동
      if (!userInfo) {
        navigate(ROUTES.SIGNUP__OAUTH);
      }
      setSignedIn(userInfo);
    };

    if (!user) handleSignIn();
  }, []);
};
