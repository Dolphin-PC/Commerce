import Column from "../styles/Column";
import { H2 } from "../atoms/Typography";
import { Ban } from "lucide-react";

const Error = () => {
  return (
    <Column className="items-center">
      <Ban size={100} className="text-red-600" />
      <H2>에러가 발생했습니다.</H2>
    </Column>
  );
};

export default Error;
