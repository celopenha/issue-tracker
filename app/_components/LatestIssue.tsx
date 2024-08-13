import prisma from "@/prisma/client";
import { Avatar, Card, Flex, Heading, Table, Text } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusBadge from "./IssueStatusBadge";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/authOptions";

const LatestIssueTable = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return null;
  const email = session?.user?.email!;

  const latestIssues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: true,
    },
    where: { user: { email } },
    take: 5,
  });

  return (
    <Card className="w-full">
      <Table.Root>
        <Table.Body>
          {latestIssues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link className="cursor-pointer" href={`/dashboard/issues/${issue.id}`}>
                  <Flex justify="between">
                    <Flex direction="column" align="start" gap="2">
                      <Text className="text-sm font-medium">{issue.title}</Text>

                      <IssueStatusBadge status={issue.status} />
                    </Flex>
                    <Avatar
                      size="2"
                      radius="full"
                      src={issue.user?.image!}
                      fallback={"?"}
                    />
                  </Flex>
                </Link>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssueTable;
