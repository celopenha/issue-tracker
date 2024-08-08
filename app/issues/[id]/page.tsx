import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "../edit/_components/EditIssueButton";
import IssueDetails from "../edit/_components/IssueDetails";
import DeleteIssueButton from "../edit/_components/DeleteIssueButton";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return (
    <>
      <div className="flex flex-col items-center justify-center py-12 border rounded-md bg-white">
        <IssueDetails issue={issue} />
        <div className="flex mt-3">
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
        </div>
      </div>
    </>
  );
};

export default IssueDetailPage;
