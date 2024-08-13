import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";

const EditIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Link href={`/dashboard/issues/edit/${issueId}`}>
      <Button>
        <FaRegEdit /> Edit issue
      </Button>
    </Link>
  );
};

export default EditIssueButton;
