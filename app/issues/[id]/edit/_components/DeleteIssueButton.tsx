import prisma from "@/prisma/client";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { MdDeleteOutline } from "react-icons/md";

const DeleteIssueButton =  ({ issueId }: { issueId: number }) => {
  // async function deleteIssue() {
  //   await prisma.issue.delete({ where: { id: issueId } });
  // }

  return (
    <Button color="red" >
      <MdDeleteOutline />
      Delete issue
    </Button>
  );
};

export default DeleteIssueButton;
