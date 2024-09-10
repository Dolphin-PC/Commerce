import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
/**
 * @desc 마우스를 올렸을 때 툴팁을 보여주는 컴포넌트
 */
const TooltipHover = ({ tooltipContent, triggerComponent }) => {
    return (_jsx(TooltipProvider, { children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: triggerComponent }), _jsx(TooltipContent, { children: tooltipContent })] }) }));
};
export default TooltipHover;
