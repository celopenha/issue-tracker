import { Issue } from "@prisma/client";
import { Badge } from "@radix-ui/themes";

const statusMap: Record<
  any,
  { label: string; color: "red" | "violet" | "green" }
> = {
  OPEN: { label: "open", color: "red" },
  IN_PROGRESS: { label: "in progress", color: "violet" },
  CLOSED: { label: "closed", color: "green" },
};

const IssueStatusBadge = ({ status }: { status: any }) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default IssueStatusBadge;
