import { Button } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusFilter from "./IssueStatusFilter";

const IssueActions = () => {
  return (
    <div className=" flex justify-between">
      <IssueStatusFilter />
      <Button>
        <Link href="/dashboard/issues/new">New Issue</Link>
      </Button>
    </div>
  );
};

export default IssueActions;
