import Column from "../atoms/Column";
import { H2 } from "../atoms/Typography";
import { Ban } from "lucide-react";
import CenterLayout from "../templates/CenterLayout";

const Error = () => {
  return (
    <Column className="items-center">
      <Ban size={100} className="text-red-600" />
      <H2>에러가 발생했습니다.</H2>
    </Column>
  );
};

export default Error;

export const CenterError = () => {
  return (
    <CenterLayout>
      <Error />
    </CenterLayout>
  );
};
