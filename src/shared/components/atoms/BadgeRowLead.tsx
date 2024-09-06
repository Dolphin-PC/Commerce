import Row from "./Row";
import { Badge } from "../ui/badge";
import { Lead } from "./Typography";

const BadgeRowLead = ({ badge, lead }: { badge: string; lead: string }) => {
  return (
    <Row className="items-center gap-2">
      <Badge variant="outline">{badge}</Badge>
      <Lead>{lead}</Lead>
    </Row>
  );
};

export default BadgeRowLead;
