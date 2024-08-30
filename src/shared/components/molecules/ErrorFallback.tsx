import { Link } from "react-router-dom";
import Row from "../atoms/Row";
import { Muted } from "../atoms/Typography";
import { Button } from "../ui/button";
import { CenterError } from "./Error";
import { ROUTES } from "@/shared/consts/route.const";

interface Props {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback = ({ error, resetErrorBoundary }: Props) => {
  console.error(error);
  return (
    <CenterError>
      <div className="w-1/2 p-4 m-2 bg-slate-100 rounded-md">
        <Muted>{error.message}</Muted>
      </div>
      <Row className="gap-3">
        <Button variant="destructive" onClick={resetErrorBoundary}>
          재시도
        </Button>
        <Button variant="default" asChild onClick={resetErrorBoundary}>
          <Link to={ROUTES.HOME}>홈으로</Link>
        </Button>
      </Row>
    </CenterError>
  );
};

export default ErrorFallback;
