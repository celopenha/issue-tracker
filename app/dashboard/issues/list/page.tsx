import prisma from "@/prisma/client";
import IssueActions from "./issueActions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/authOptions";
import { Issue } from "@prisma/client";
import Pagination from "@/app/_components/Pagination";
import IssueTable, { tableColumns } from "./IssueTable";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";

const IssuesPage = async ({
  searchParams,
}: {
  searchParams: {
    status: any;
    orderBy: keyof Issue;
    page: string;
    order: string;
  };
}) => {
  const session = await getServerSession(authOptions);

  if (!session) return null;

  const email = session!.user!.email;

  const statuses = ["OPEN", "IN_PROGRESS", "CLOSE"];

  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = tableColumns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: searchParams.order }
    : undefined;

  const defaultOrderBy: {} = {
    createdAt: "desc",
  };

  const page = parseInt(searchParams.page) || 1;

  const pageSize: number = parseInt(process.env.PAGE_SIZE!) || 0;

  const where = {
    user: { email: email || "" },
    status,
  };

  const issues = await prisma.issue.findMany({
    orderBy: orderBy ? orderBy : defaultOrderBy,
    where,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({
    where,
  });

  return (
    <Flex direction={"column"} gap="4">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        itemCount={issueCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View your project issues",
};

export default IssuesPage;
