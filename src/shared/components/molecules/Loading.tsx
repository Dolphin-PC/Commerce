import { Loader } from "lucide-react";
import Column from "../atoms/Column";
import { H4 } from "../atoms/Typography";
import CenterLayout from "../templates/CenterLayout";

interface Props {
  text?: string;
}

const Loading = ({ text = "로딩 중입니다." }: Props) => {
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
