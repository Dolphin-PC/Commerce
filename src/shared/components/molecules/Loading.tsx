import { Loader } from "lucide-react";
import Column from "../styles/Column";
import { H4 } from "../atoms/Typography";

const Loading = () => {
  return (
    <Column className="items-center">
      <Loader size={100} className="text-red-600" />
      <H4>로딩 중입니다.</H4>
    </Column>
  );
};

export default Loading;
