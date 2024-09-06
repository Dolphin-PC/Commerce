import { H2 } from "@/shared/components/atoms/Typography";
import DashBoardLayout from "@/shared/components/templates/DashBoardLayout";
import { DashBoardPageHelmet } from "../Helmets";

const _DashBoardPage = () => {
  return <H2>대시보드</H2>;
};

export default function DashBoardPage() {
  return (
    <DashBoardLayout>
      <DashBoardPageHelmet />
      <_DashBoardPage />
    </DashBoardLayout>
  );
}
