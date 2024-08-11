import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import EditIssueButton from "../edit/_components/EditIssueButton";
import IssueDetails from "../edit/_components/IssueDetails";
import DeleteIssueButton from "../edit/_components/DeleteIssueButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/authOptions";
import AssigneeSelect from "./AssigneeSelect";
import { cache } from "react";

interface Props {
  params: { id: string };
}
const fetchUser = cache((issueId: number) => prisma.issue.findUnique({ where: { id: issueId } }));

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);

  const issue = await fetchUser(parseInt(params.id))

  if (!issue) notFound();

  return (
    <>
      <div className="flex flex-col  items-center justify-center py-12 border rounded-md bg-white">
        <IssueDetails issue={issue} />
        {session && (
          <div className="flex mt-3 space-x-4">
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </div>
        )}
      </div>
    </>
  );
};
export async function generateMetadata({ params }: Props) {
  const issue = await fetchUser(parseInt(params.id));
  
  return {
    title: `Issue - ${issue?.title}`,
    description: issue?.description,
  };
}

export default IssueDetailPage;
