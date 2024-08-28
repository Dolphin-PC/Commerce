import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

interface Props {
  tooltipContent: React.ReactNode;
  triggerComponent: React.ReactNode;
}

/**
 * @desc 마우스를 올렸을 때 툴팁을 보여주는 컴포넌트
 */
const TooltipHover = ({ tooltipContent, triggerComponent }: Props) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{triggerComponent}</TooltipTrigger>
        <TooltipContent>{tooltipContent}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipHover;
