import { H2 } from "@/shared/components/atoms/Typography";
import DashBoardLayout from "@/shared/components/templates/DashBoardLayout";
import { DashBoardPageHelmet } from "./Helmets";

const DashBoardPage = () => {
  return (
    <DashBoardLayout>
      <DashBoardPageHelmet />
      <H2>대시보드</H2>
    </DashBoardLayout>
  );
};

export default DashBoardPage;
