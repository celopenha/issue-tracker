import prisma from "@/prisma/client";
import IssueSummary from "../_components/IssueSummary";
import LatestIssueTable from "../_components/LatestIssue";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/authOptions";
import IssueChart from "../_components/IssueChart";
import { Metadata } from "next";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) return null;
  const email = session?.user?.email!;

  const openIssues = await prisma.issue.count({
    where: { status: "OPEN", user: { email } },
  });
  const inProgressIssues = await prisma.issue.count({
    where: { status: "IN_PROGRESS", user: { email } },
  });
  const closedIssues = await prisma.issue.count({
    where: { status: "CLOSED", user: { email } },
  });

  return (
    <>
      <IssueSummary
        open={openIssues}
        inProgress={inProgressIssues}
        closed={closedIssues}
      />
      <div className="flex gap-y-4 flex-col w-full gap-x-4 md:flex-row md:gap-y-0">
        <LatestIssueTable />
        <IssueChart
          open={openIssues}
          inProgress={inProgressIssues}
          closed={closedIssues}
        />
      </div>
    </>
  );
}

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "View a summary of project issues",
};
