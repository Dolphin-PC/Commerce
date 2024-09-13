import { Loader } from "lucide-react";
import Column from "../atoms/Column";
import { H4 } from "../atoms/Typography";
import CenterLayout from "../templates/CenterLayout";
import { useEffect, useState } from "react";

interface Props {
  text?: string;
}

/**
 * @desc 공통 로딩
 *  - 100ms 이하인 경우, 로딩창 보이지 않음
 *  @see https://github.com/Dolphin-PC/Commerce/issues/37
 */
const Loading = ({ text = "로딩 중입니다." }: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  }, []);

  if (isLoading) return null;
  return (
    <Column className="items-center">
      <Loader size={100} className="text-red-600" />
      <H4>{text}</H4>
    </Column>
  );
};

export const CenterLoading = () => {
  return (
    <CenterLayout>
      <Loading />
    </CenterLayout>
  );
};

export default Loading;
