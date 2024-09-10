import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Row from "./Row";
import { Badge } from "../ui/badge";
import { Lead } from "./Typography";
const BadgeRowLead = ({ badge, lead }) => {
    return (_jsxs(Row, { className: "items-center gap-2", children: [_jsx(Badge, { variant: "outline", children: badge }), _jsx(Lead, { children: lead })] }));
};
export default BadgeRowLead;
